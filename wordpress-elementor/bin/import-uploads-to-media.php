<?php
/**
 * Register existing files under wp-content/uploads as Media Library attachments.
 * Skips files that already have an attachment. Does not copy/move files.
 *
 * Run: wp eval-file wp-content/rsms-bin/import-uploads-to-media.php
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

$uploads = wp_get_upload_dir();
$basedir = trailingslashit( $uploads['basedir'] );
$baseurl = trailingslashit( $uploads['baseurl'] );

if ( ! is_dir( $basedir ) ) {
	WP_CLI::error( "Uploads dir missing: {$basedir}" );
}

$skip_ext = array( 'php', 'html', 'htm', 'js', 'css', 'json', 'xml', 'log', 'txt', 'ds_store' );
$ok       = 0;
$skip     = 0;
$fail     = 0;

$iterator = new RecursiveIteratorIterator(
	new RecursiveDirectoryIterator( $basedir, FilesystemIterator::SKIP_DOTS )
);

foreach ( $iterator as $file ) {
	/** @var SplFileInfo $file */
	if ( ! $file->isFile() ) {
		continue;
	}

	$path = $file->getPathname();
	$rel  = ltrim( str_replace( $basedir, '', $path ), '/' );
	$ext  = strtolower( pathinfo( $path, PATHINFO_EXTENSION ) );

	// Brand/theme static pack — not Media Library content.
	if ( 0 === strpos( str_replace( '\\', '/', $rel ), 'rsms-static/' ) ) {
		++$skip;
		continue;
	}

	if ( '' === $ext || in_array( $ext, $skip_ext, true ) ) {
		++$skip;
		continue;
	}

	// Already registered?
	$existing = attachment_url_to_postid( $baseurl . str_replace( '\\', '/', $rel ) );
	if ( $existing ) {
		++$skip;
		continue;
	}

	$filetype = wp_check_filetype( basename( $path ), null );
	if ( empty( $filetype['type'] ) ) {
		++$skip;
		continue;
	}

	$attachment = array(
		'post_mime_type' => $filetype['type'],
		'post_title'     => preg_replace( '/\.[^.]+$/', '', basename( $path ) ),
		'post_content'   => '',
		'post_status'    => 'inherit',
		'guid'           => $baseurl . str_replace( '\\', '/', $rel ),
	);

	$attach_id = wp_insert_attachment( $attachment, $path );
	if ( is_wp_error( $attach_id ) || ! $attach_id ) {
		WP_CLI::warning( "Fail: {$rel}" );
		++$fail;
		continue;
	}

	require_once ABSPATH . 'wp-admin/includes/image.php';
	$meta = wp_generate_attachment_metadata( $attach_id, $path );
	if ( $meta ) {
		wp_update_attachment_metadata( $attach_id, $meta );
	}

	update_post_meta( $attach_id, '_wp_attached_file', $rel );
	++$ok;
	if ( 0 === $ok % 25 ) {
		WP_CLI::log( "Registered {$ok}…" );
	}
}

WP_CLI::success( "Done. registered={$ok} skipped={$skip} failed={$fail}" );
WP_CLI::log( 'Media Library count: ' . (string) wp_count_posts( 'attachment' )->inherit );

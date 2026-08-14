<?php
/**
 * Backward-compatible entrypoint for the native Elementor page converter.
 *
 * Keep this filename because older documentation and local scripts call it,
 * but never restore the retired one-HTML-widget-per-page implementation.
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

require __DIR__ . '/rebuild-all-native.php';

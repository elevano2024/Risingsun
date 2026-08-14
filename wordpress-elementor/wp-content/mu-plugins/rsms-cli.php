<?php
/**
 * WP-CLI: wp rsms seed-pages
 *
 * Creates the Next.js route tree as hierarchical WordPress pages
 * so permalinks match the advanced app (not live legacy flat URLs).
 */

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	return;
}

/**
 * @param array<int, array{slug:string,title:string,children?:array}> $nodes
 * @param int $parent_id
 */
function rsms_seed_page_tree( array $nodes, int $parent_id = 0 ): void {
	foreach ( $nodes as $node ) {
		$existing = get_page_by_path(
			rsms_full_path( $node['slug'], $parent_id ),
			OBJECT,
			'page'
		);

		if ( $existing ) {
			$page_id = (int) $existing->ID;
			WP_CLI::log( "exists: {$node['slug']} (#{$page_id})" );
		} else {
			$page_id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $node['title'],
					'post_name'    => $node['slug'],
					'post_parent'  => $parent_id,
					'post_content' => "<!-- wp:paragraph --><p>TODO: Convert from Next.js — {$node['title']}</p><!-- /wp:paragraph -->",
				),
				true
			);
			if ( is_wp_error( $page_id ) ) {
				WP_CLI::warning( $page_id->get_error_message() );
				continue;
			}
			WP_CLI::success( "created: {$node['slug']} (#{$page_id})" );
		}

		if ( ! empty( $node['children'] ) ) {
			rsms_seed_page_tree( $node['children'], (int) $page_id );
		}
	}
}

function rsms_full_path( string $slug, int $parent_id ): string {
	if ( 0 === $parent_id ) {
		return $slug;
	}
	$parent = get_post( $parent_id );
	if ( ! $parent ) {
		return $slug;
	}
	return trim( get_page_uri( $parent_id ) . '/' . $slug, '/' );
}

WP_CLI::add_command(
	'rsms seed-pages',
	static function () {
		$tree = array(
			array(
				'slug'  => 'home',
				'title' => 'Home',
			),
			array(
				'slug'  => 'contact',
				'title' => 'Contact',
			),
			array(
				'slug'  => 'gallery',
				'title' => 'Gallery',
			),
			array(
				'slug'  => 'arts-education',
				'title' => 'Arts Education',
			),
			array(
				'slug'  => 'enrollment-school-tours',
				'title' => 'Enrollment & School Tours',
			),
			array(
				'slug'  => 'our-campus',
				'title' => 'Our Campus',
			),
			array(
				'slug'  => 'our-classroom',
				'title' => 'Our Classroom',
			),
			array(
				'slug'  => 'our-students',
				'title' => 'Our Students',
			),
			array(
				'slug'     => 'about',
				'title'    => 'About',
				'children' => array(
					array( 'slug' => 'meet-our-staff', 'title' => 'Meet Our Staff' ),
					array( 'slug' => 'school-metric-performance', 'title' => 'School Metric Performance' ),
					array( 'slug' => 'education-protection-account', 'title' => 'Education Protection Account' ),
					array( 'slug' => 'accountability-plan', 'title' => 'Accountability Plan' ),
					array( 'slug' => 'rsms-charter-petition', 'title' => 'RSMS Charter Petition' ),
					array( 'slug' => 'charter-selap-local-plan', 'title' => 'Charter SELPA Local Plan' ),
					array( 'slug' => 'facts-about-charter-schools', 'title' => 'Facts About Charter Schools' ),
				),
			),
			array(
				'slug'     => 'program',
				'title'    => 'Program',
				'children' => array(
					array( 'slug' => 'the-montessori-method', 'title' => 'Why Montessori?' ),
					array( 'slug' => 'tk-kindergarten', 'title' => 'TK / Kindergarten' ),
					array( 'slug' => 'lower-elementary', 'title' => 'Lower Elementary' ),
					array( 'slug' => 'upper-elementary', 'title' => 'Upper Elementary' ),
					array( 'slug' => 'middle-school', 'title' => 'Middle School' ),
					array( 'slug' => 'electives-clubs', 'title' => 'Electives & Clubs' ),
					array( 'slug' => 'learning-beyond-the-classroom-field-trips', 'title' => 'Field Trips' ),
					array( 'slug' => 'community-activities', 'title' => 'Community Activities' ),
				),
			),
			array(
				'slug'     => 'school-information',
				'title'    => 'School Information',
				'children' => array(
					array( 'slug' => 'academic-calendar', 'title' => 'Academic Calendar' ),
					array( 'slug' => 'daily-schedule', 'title' => 'Daily Schedule' ),
					array( 'slug' => 'family-handbook', 'title' => 'Family Handbook' ),
					array( 'slug' => 'supply-list', 'title' => 'Supply List' ),
				),
			),
			array(
				'slug'     => 'parents',
				'title'    => 'Parents',
				'children' => array(
					array( 'slug' => 'extended-learning-opportunities-program', 'title' => 'ELOP' ),
					array( 'slug' => 'suicide-awareness-prevention', 'title' => 'Suicide Awareness & Prevention' ),
					array( 'slug' => 'homelessness-services', 'title' => 'Homelessness Services' ),
					array( 'slug' => 'parent-committee', 'title' => 'Parent Committee' ),
					array( 'slug' => 'notices', 'title' => 'Notices' ),
				),
			),
			array(
				'slug'     => 'leadership',
				'title'    => 'Leadership',
				'children' => array(
					array( 'slug' => 'board-of-directors', 'title' => 'Board of Directors' ),
					array( 'slug' => 'board-agendas', 'title' => 'Board Agendas' ),
					array( 'slug' => 'board-meeting-schedule', 'title' => 'Board Meeting Schedule' ),
					array( 'slug' => 'board-policies', 'title' => 'Board Policies' ),
				),
			),
		);

		rsms_seed_page_tree( $tree );

		// Front page = Home
		$home = get_page_by_path( 'home' );
		if ( $home ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', (int) $home->ID );
			WP_CLI::success( 'Front page set to Home' );
		}

		flush_rewrite_rules( false );
		WP_CLI::success( 'Page tree seeded. Permalinks flushed.' );
	}
);

WP_CLI::add_command(
	'rsms seed-staff',
	static function () {
		$parent = get_page_by_path( 'about/meet-our-staff' );
		if ( ! $parent ) {
			WP_CLI::error( 'Run wp rsms seed-pages first (missing about/meet-our-staff).' );
		}

		$staff_file = ABSPATH . '../../src/app/about/meet-our-staff/staffData.ts';
		// staffData lives on the host; inside container use mapped path if present.
		$candidates = array(
			'/var/www/html/wp-content/rsms-bin/staff-slugs.json',
			dirname( __DIR__ ) . '/bin/staff-slugs.json',
		);

		$slugs = null;
		foreach ( $candidates as $path ) {
			if ( file_exists( $path ) ) {
				$slugs = json_decode( (string) file_get_contents( $path ), true );
				break;
			}
		}

		if ( ! is_array( $slugs ) ) {
			WP_CLI::error( 'Missing staff-slugs.json — run npm run wp:prepare-staff first.' );
		}

		foreach ( $slugs as $row ) {
			$slug  = $row['slug'];
			$title = $row['title'];
			$path  = 'about/meet-our-staff/' . $slug;
			$existing = get_page_by_path( $path );
			if ( $existing ) {
				WP_CLI::log( "exists staff: {$slug}" );
				continue;
			}
			$id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_status'  => 'publish',
					'post_title'   => $title,
					'post_name'    => $slug,
					'post_parent'  => (int) $parent->ID,
					'post_content' => "<!-- wp:paragraph --><p>TODO: Convert staff bio from Next.js — {$title}</p><!-- /wp:paragraph -->",
				),
				true
			);
			if ( is_wp_error( $id ) ) {
				WP_CLI::warning( $id->get_error_message() );
				continue;
			}
			WP_CLI::success( "created staff: {$slug} (#{$id})" );
		}
	}
);

/**
 * Load seo-catalog.json from mapped bin.
 *
 * @return array<string,mixed>
 */
function rsms_load_seo_catalog(): array {
	$candidates = array(
		'/var/www/html/wp-content/rsms-bin/seo-catalog.json',
		dirname( __DIR__, 2 ) . '/bin/seo-catalog.json',
	);
	foreach ( $candidates as $path ) {
		if ( file_exists( $path ) ) {
			$data = json_decode( (string) file_get_contents( $path ), true );
			if ( is_array( $data ) ) {
				return $data;
			}
		}
	}
	WP_CLI::error( 'Missing seo-catalog.json — run npm run wp:seo-catalog first.' );
}

/**
 * Apply Yoast + conversion meta for one page entry.
 *
 * @param int                  $post_id Post ID.
 * @param array<string,mixed>  $seo     Catalog page row.
 */
function rsms_apply_yoast_meta( int $post_id, array $seo ): void {
	$map = array(
		'_yoast_wpseo_title'                 => $seo['seoTitle'] ?? '',
		'_yoast_wpseo_metadesc'              => $seo['metaDescription'] ?? '',
		'_yoast_wpseo_focuskw'               => $seo['focusKeyphrase'] ?? '',
		'_yoast_wpseo_canonical'             => $seo['canonical'] ?? '',
		'_yoast_wpseo_opengraph-title'       => $seo['ogTitle'] ?? '',
		'_yoast_wpseo_opengraph-description' => $seo['ogDescription'] ?? '',
		'_yoast_wpseo_opengraph-image'       => $seo['ogImage'] ?? '',
		'_yoast_wpseo_twitter-title'         => $seo['twitterTitle'] ?? '',
		'_yoast_wpseo_twitter-description'   => $seo['twitterDescription'] ?? '',
		'_yoast_wpseo_twitter-image'         => $seo['twitterImage'] ?? '',
		'_yoast_wpseo_meta-robots-noindex'   => empty( $seo['robotsIndex'] ) ? '1' : '0',
		'_yoast_wpseo_meta-robots-nofollow'  => empty( $seo['robotsFollow'] ) ? '1' : '0',
		'_rsms_next_path'                    => $seo['path'] ?? '',
		'_rsms_conversion_status'            => 'seeded',
		'_rsms_seo_schema_type'              => $seo['schemaType'] ?? 'WebPage',
		'_rsms_sitemap_priority'             => (string) ( $seo['sitemapPriority'] ?? '0.7' ),
	);

	foreach ( $map as $key => $value ) {
		update_post_meta( $post_id, $key, $value );
	}

	if ( ! empty( $seo['keywords'] ) && is_array( $seo['keywords'] ) ) {
		update_post_meta( $post_id, '_rsms_seo_keywords', implode( ', ', $seo['keywords'] ) );
	}
}

WP_CLI::add_command(
	'rsms configure-yoast',
	static function () {
		$catalog = rsms_load_seo_catalog();
		$site    = $catalog['site'] ?? array();

		$wpseo = get_option( 'wpseo', array() );
		if ( ! is_array( $wpseo ) ) {
			$wpseo = array();
		}
		$wpseo['enable_xml_sitemap']           = true;
		$wpseo['enable_index_now']             = true;
		$wpseo['content_analysis_active']      = true;
		$wpseo['keyword_analysis_active']      = true;
		$wpseo['enable_enhanced_slack_sharing'] = true;
		$wpseo['company_or_person']            = 'company';
		$wpseo['company_name']                 = $site['name'] ?? 'Rising Sun Montessori School';
		$wpseo['company_logo']                 = '';
		$wpseo['website_name']                 = $site['name'] ?? 'Rising Sun Montessori School';
		$wpseo['alternate_website_name']       = 'RSMS';
		$wpseo['environment_type']             = 'production'; // portable defaults for later live
		$wpseo['site_type']                    = 'smallBusiness';
		update_option( 'wpseo', $wpseo );

		$titles = get_option( 'wpseo_titles', array() );
		if ( ! is_array( $titles ) ) {
			$titles = array();
		}
		$titles['separator']                    = 'sc-pipe';
		$titles['title-home-wpseo']              = 'Rising Sun Montessori School | Montessori Education in El Dorado Hills, CA';
		$titles['metadesc-home-wpseo']           = $site['defaultDescription'] ?? '';
		$titles['title-page']                    = '%%title%% %%sep%% %%sitename%%';
		$titles['metadesc-page']                 = '%%excerpt%%';
		$titles['noindex-author-wpseo']          = true;
		$titles['disable-author']                = true;
		$titles['disable-date']                  = true;
		$titles['breadcrumbs-enable']            = true;
		$titles['breadcrumbs-home']              = 'Home';
		$titles['breadcrumbs-sep']               = '»';
		$titles['company_or_person']             = 'company';
		$titles['company_name']                  = $site['name'] ?? 'Rising Sun Montessori School';
		$titles['website_name']                  = $site['name'] ?? 'Rising Sun Montessori School';
		$titles['alternate_website_name']        = 'RSMS';
		$titles['org-description']               = $site['defaultDescription'] ?? '';
		$titles['org-email']                     = 'info@risingsunmontessori.org';
		$titles['org-phone']                     = '+1-916-936-2333';
		$titles['org-legal-name']                = $site['name'] ?? 'Rising Sun Montessori School';
		update_option( 'wpseo_titles', $titles );

		$social = get_option( 'wpseo_social', array() );
		if ( ! is_array( $social ) ) {
			$social = array();
		}
		$social['og_default_image']       = $site['ogImage'] ?? '';
		$social['og_default_image_id']    = 0;
		$social['facebook_site']          = 'https://www.facebook.com/risingsunmontessori';
		$social['instagram_url']          = 'https://www.instagram.com/risingsunmontessori';
		$social['twitter_site']           = '';
		$social['twitter_card_type']      = 'summary_large_image';
		$social['opengraph']              = true;
		$social['twitter']                = true;
		update_option( 'wpseo_social', $social );

		update_option( 'blogdescription', $site['tagline'] ?? 'An Authentic Montessori School' );
		update_option( 'rsms_organization_schema', wp_json_encode( $site['organizationSchema'] ?? array() ) );

		WP_CLI::success( 'Yoast site-wide SEO configured from seo-catalog.json' );
	}
);

WP_CLI::add_command(
	'rsms seed-seo',
	static function ( $args, $assoc_args ) {
		$catalog = rsms_load_seo_catalog();
		$pages   = $catalog['pages'] ?? array();
		$ok      = 0;
		$missing = 0;

		foreach ( $pages as $seo ) {
			$wp_path = $seo['wpPath'] ?? '';
			if ( '' === $wp_path ) {
				continue;
			}
			$page = get_page_by_path( $wp_path );
			if ( ! $page ) {
				WP_CLI::warning( "missing page for SEO path: {$wp_path}" );
				++$missing;
				continue;
			}
			rsms_apply_yoast_meta( (int) $page->ID, $seo );
			WP_CLI::log( "seo: /{$wp_path} (#{$page->ID})" );
			++$ok;
		}

		WP_CLI::success( "SEO applied to {$ok} pages; {$missing} missing." );
	}
);

WP_CLI::add_command(
	'rsms verify-seo',
	static function () {
		$catalog = rsms_load_seo_catalog();
		$pages   = $catalog['pages'] ?? array();
		$fail    = 0;

		foreach ( $pages as $seo ) {
			$wp_path = $seo['wpPath'] ?? '';
			$page    = get_page_by_path( $wp_path );
			if ( ! $page ) {
				WP_CLI::warning( "FAIL missing page: {$wp_path}" );
				++$fail;
				continue;
			}
			$id    = (int) $page->ID;
			$title = get_post_meta( $id, '_yoast_wpseo_title', true );
			$desc  = get_post_meta( $id, '_yoast_wpseo_metadesc', true );
			$kw    = get_post_meta( $id, '_yoast_wpseo_focuskw', true );
			$canon = get_post_meta( $id, '_yoast_wpseo_canonical', true );
			$og    = get_post_meta( $id, '_yoast_wpseo_opengraph-title', true );
			if ( ! $title || ! $desc || ! $kw || ! $canon || ! $og ) {
				WP_CLI::warning( "FAIL incomplete Yoast meta: {$wp_path}" );
				++$fail;
				continue;
			}
			WP_CLI::log( "ok: {$wp_path}" );
		}

		if ( $fail > 0 ) {
			WP_CLI::error( "SEO verify failed on {$fail} pages." );
		}
		WP_CLI::success( 'All catalog pages have core Yoast SEO fields.' );
	}
);

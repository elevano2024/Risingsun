<?php
/**
 * RSMS Elementor theme — Next chrome + Elementor bodies.
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'RSMS_ELEMENTOR_VERSION', '1.0.155' );

/**
 * Register RSMS-native Elementor widgets.
 */
add_action(
	'elementor/widgets/register',
	static function ( $widgets_manager ) {
		require_once get_stylesheet_directory() . '/inc/class-rsms-elementor-pdf-widget.php';
		$widgets_manager->register( new RSMS_Elementor_PDF_Widget() );
	}
);

add_action(
	'after_setup_theme',
	static function () {
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
		show_admin_bar( false );
	}
);

/**
 * Hub pages have no Next.js equivalent — redirect to first submenu page.
 */
add_action(
	'template_redirect',
	static function () {
		if ( is_admin() || wp_doing_ajax() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return;
		}
		$map = array(
			'school-information' => '/school-information/academic-calendar/',
			'parents'            => '/parents/extended-learning-opportunities-program/',
			'leadership'         => '/leadership/board-of-directors/',
		);
		if ( ! is_page( array_keys( $map ) ) ) {
			return;
		}
		$slug = get_post_field( 'post_name', get_queried_object_id() );
		if ( isset( $map[ $slug ] ) ) {
			wp_safe_redirect( home_url( $map[ $slug ] ), 301 );
			exit;
		}
	}
);

add_action(
	'wp_enqueue_scripts',
	static function () {
		$uri = get_stylesheet_directory_uri();
		$ver = RSMS_ELEMENTOR_VERSION;

		foreach ( array( 'wp-block-library', 'wp-block-library-theme', 'classic-theme-styles', 'global-styles' ) as $handle ) {
			wp_dequeue_style( $handle );
			wp_deregister_style( $handle );
		}
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );

		$sheets = array(
			'rsms-global'     => '/assets/css/rsms-global.css',
			'rsms-header'     => '/assets/css/rsms-header.css',
			'rsms-footer'     => '/assets/css/rsms-footer.css',
			'rsms-home'       => '/assets/css/rsms-home.css',
			'rsms-list-item'  => '/assets/css/rsms-list-item.css',
			'rsms-contact'    => '/assets/css/rsms-contact.css',
			'rsms-carousel'   => '/assets/css/rsms-carousel.css',
			'rsms-detail'     => '/assets/css/rsms-detail-card.css',
			'rsms-image-text' => '/assets/css/rsms-image-text.css',
			'rsms-pages'      => '/assets/css/rsms-pages-bundle.css',
			'rsms-el-about'   => '/assets/css/rsms-elementor-about.css',
			'rsms-el-native'  => '/assets/css/rsms-elementor-native.css',
		);

		$deps = array();
		foreach ( $sheets as $handle => $path ) {
			wp_enqueue_style( $handle, $uri . $path, $deps, $ver );
			$deps = array( $handle );
		}

		wp_enqueue_style( 'rsms-elementor-child', get_stylesheet_uri(), $deps, $ver );

		wp_enqueue_script( 'rsms-header', $uri . '/assets/js/header.js', array(), $ver, true );
		wp_enqueue_script( 'rsms-carousel', $uri . '/assets/js/carousel.js', array(), $ver, true );
		wp_enqueue_script( 'rsms-gallery', $uri . '/assets/js/gallery.js', array(), $ver, true );
		wp_enqueue_script( 'rsms-pdf-preview', $uri . '/assets/js/pdf-preview.js', array(), $ver, true );

		wp_localize_script(
			'rsms-carousel',
			'rsmsCarousel',
			array(
				'homeSlides' => rsms_home_slides(),
			)
		);
	},
	100
);

/**
 * @return array<int, array{title:string,subTitle:string,image:string,link:string}>
 */
function rsms_home_slides(): array {
	return array(
		array(
			'title'    => 'Our Campus',
			'subTitle' => 'Nestled in the golden foothills of southeast El Dorado County, Rising Sun Montessori School is located in El Dorado Hills off Latrobe Road.',
			'image'    => home_url( '/wp-content/uploads/2022/04/campus-scaled.jpg' ),
			'link'     => home_url( '/our-campus/' ),
		),
		array(
			'title'    => 'Our Classrooms',
			'subTitle' => 'Rising Sun Montessori classrooms are designed to meet the needs of each child, allowing them to learn at their own pace and in their own way.',
			'image'    => home_url( '/wp-content/uploads/2022/04/Montessori-Classroom.jpg' ),
			'link'     => home_url( '/our-classroom/' ),
		),
		array(
			'title'    => 'Our Students',
			'subTitle' => 'At Rising Sun Montessori School we are committed to enrolling a diverse student population and creating a school community that reflects the diversity of our students and parents.',
			'image'    => home_url( '/wp-content/uploads/2022/04/students-scaled.jpg' ),
			'link'     => home_url( '/our-students/' ),
		),
	);
}

/**
 * @param string $path Path with leading slash preferred.
 */
function rsms_url( string $path ): string {
	$path = '/' . ltrim( $path, '/' );
	if ( '/' === $path ) {
		return home_url( '/' );
	}
	return home_url( trailingslashit( $path ) );
}

add_action(
	'wp_enqueue_scripts',
	static function () {
		wp_dequeue_style( 'elementor-gf-roboto' );
		wp_deregister_style( 'elementor-gf-roboto' );
		wp_dequeue_style( 'elementor-gf-robotoslab' );
		wp_deregister_style( 'elementor-gf-robotoslab' );
		wp_dequeue_style( 'elementor-icons' );
		wp_dequeue_style( 'e-animations' );
	},
	120
);

add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );

/**
 * Sections use `css_classes`; widgets use `_css_classes`.
 * Apply misplaced `_css_classes` on sections only when `css_classes` is empty.
 */
add_action(
	'elementor/frontend/section/before_render',
	static function ( $element ) {
		$settings = $element->get_settings_for_display();
		if ( trim( (string) ( $settings['css_classes'] ?? '' ) ) !== '' ) {
			return;
		}
		$classes = trim( (string) ( $settings['_css_classes'] ?? '' ) );
		if ( '' === $classes ) {
			return;
		}
		foreach ( preg_split( '/\s+/', $classes ) as $class ) {
			if ( '' !== $class ) {
				$element->add_render_attribute( '_wrapper', 'class', $class );
			}
		}
	}
);

add_action(
	'elementor/frontend/after_enqueue_styles',
	static function () {
		wp_dequeue_style( 'elementor-gf-roboto' );
		wp_dequeue_style( 'elementor-gf-robotoslab' );
	},
	20
);

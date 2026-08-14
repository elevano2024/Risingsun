<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php
$rsms_is_home = is_front_page();
?>
<header class="header_main<?php echo $rsms_is_home ? '' : ' header_main--interior'; ?>">
	<div class="header_main__subWrapper">
		<?php if ( $rsms_is_home ) : ?>
			<img src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/IllustrationLine.svg' ) ); ?>" alt="" />
		<?php else : ?>
			<img src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/header-banner.svg' ) ); ?>" alt="" />
		<?php endif; ?>
	</div>
	<div class="container header_main__headMenu">
		<a class="header_main__headMenu__logoLink" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<img
				class="header_main__headMenu__logo"
				src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/logo.svg' ) ); ?>"
				alt="Rising Sun Montessori School — Home"
			/>
		</a>

		<nav class="header_main__headMenu__primary" id="rsms-primary-nav" aria-label="Featured"></nav>

		<div class="header_main__headMenu__actions">
			<a class="header_main__headMenu__links__link__contact" href="<?php echo esc_url( rsms_url( '/contact' ) ); ?>">
				Contact Us
			</a>
			<button
				class="header_main__headMenu__hamburger"
				id="rsms-hamburger"
				aria-label="Open menu"
				aria-expanded="false"
				aria-controls="rsms-nav-drawer"
				type="button"
			>
				<span></span><span></span><span></span>
			</button>
		</div>
	</div>

	<?php if ( $rsms_is_home ) : ?>
		<?php
		$rsms_slides = function_exists( 'rsms_home_slides' ) ? rsms_home_slides() : array();
		$rsms_slide0 = $rsms_slides[0] ?? array(
			'title'    => 'Our Campus',
			'subTitle' => '',
			'image'    => '/wp-content/uploads/2022/04/campus-scaled.jpg',
			'link'     => home_url( '/our-campus/' ),
		);
		?>
		<div class="container header_main__content">
			<div class="header_main__content__carousel">
				<div class="header_main__content__carousel__content">
					<div class="title">
						<img src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/school.svg' ) ); ?>" alt="" />
						<span id="rsms-carousel-title"><?php echo esc_html( $rsms_slide0['title'] ); ?></span>
					</div>
					<div class="subtitle" id="rsms-carousel-subtitle"><?php echo esc_html( $rsms_slide0['subTitle'] ); ?></div>
					<button type="button" id="rsms-carousel-cta">Read More</button>
				</div>
				<div class="header_main__content__carousel__carousel">
					<div class="carousel" id="rsms-carousel">
						<div class="carousel__image-wrapper">
							<img
								class="carousel__image is-active"
								id="rsms-carousel-image"
								src="<?php echo esc_url( $rsms_slide0['image'] ); ?>"
								alt="<?php echo esc_attr( $rsms_slide0['title'] ); ?>"
							/>
							<img src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/carouselborder-1.svg' ) ); ?>" class="carousel__border bottom" alt="" />
							<img src="<?php echo esc_url( home_url( '/wp-content/uploads/rsms-static/images/carouselborder-2.svg' ) ); ?>" class="carousel__border top" alt="" />
						</div>
						<div class="carousel__dots" id="rsms-carousel-dots"></div>
					</div>
				</div>
			</div>
		</div>
	<?php endif; ?>
	<?php
	/*
	 * Interior page heroes live as Elementor widgets (.rsms-el-hero).
	 * Logo / nav remain here (Elementor Free has no Theme Builder).
	 */
	?>
</header>

<div class="header_main__navOverlay" id="rsms-nav-overlay" hidden></div>
<aside
	class="header_main__navDrawer"
	id="rsms-nav-drawer"
	role="dialog"
	aria-modal="true"
	aria-label="Site menu"
	hidden
>
	<div class="header_main__navDrawer__top">
		<p class="header_main__navDrawer__title">Menu</p>
		<button type="button" class="header_main__navDrawer__close" id="rsms-nav-close" aria-label="Close menu">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<nav class="header_main__navDrawer__nav" id="rsms-drawer-nav" aria-label="All pages"></nav>
</aside>

<main id="content">

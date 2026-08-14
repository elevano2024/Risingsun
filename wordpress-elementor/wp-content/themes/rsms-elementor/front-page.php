<?php
/**
 * Front page — Elementor content.
 *
 * @package RSMS_Elementor
 */

get_header();

if ( have_posts() ) {
	while ( have_posts() ) {
		the_post();
		the_content();
	}
}

get_footer();

<?php
/**
 * Plugin Name: RSMS Elementor Local Notice
 * Description: Local Elementor Free rebuild helper notice.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'admin_notices',
	static function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		if ( is_plugin_active( 'elementor/elementor.php' ) ) {
			return;
		}
		echo '<div class="notice notice-warning"><p><strong>RSMS Elementor:</strong> Activate the Elementor plugin (Free) to edit pages visually.</p></div>';
	}
);

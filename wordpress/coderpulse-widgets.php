<?php
/**
 * Plugin Name: CoderPulse Widgets
 * Description: A collection of open-source widgets and components from CoderPulse.io.
 * Version: 1.0.0
 * Author: CoderPulse
 * Author URI: https://coderpulse.io
 * License: GPL-2.0+
 * Text Domain: coderpulse-widgets
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue scripts and styles for both front-end and editor.
 */
function cpw_enqueue_block_assets() {
	wp_enqueue_script(
		'cpw-library',
		plugins_url( 'assets/coderpulse-widgets-embed.umd.js', __FILE__ ),
		array(),
		'1.1.0',
		true
	);
}
add_action( 'enqueue_block_assets', 'cpw_enqueue_block_assets' );

/**
 * Register custom block category.
 */
function cpw_register_block_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'coderpulse',
				'title' => __( 'CoderPulse', 'coderpulse-widgets' ),
				'icon'  => null,
			),
		)
	);
}
add_filter( 'block_categories_all', 'cpw_register_block_category', 10, 2 );

/**
 * Register Gutenberg blocks.
 */
function cpw_register_blocks() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Register the editor-only script
	wp_register_script(
		'cpw-block-editor',
		plugins_url( 'assets/editor.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/editor.js' )
	);

	// Register the Cron Builder block
	register_block_type( 'coderpulse/cron-builder', array(
		'editor_script' => 'cpw-block-editor',
	) );
}
add_action( 'init', 'cpw_register_blocks' );

/**
 * Load text domain for translation.
 */
function cpw_load_textdomain() {
	load_plugin_textdomain( 'coderpulse-widgets', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'init', 'cpw_load_textdomain' );

/**
 * Shortcode for Cron Builder Widget
 * Usage: [cp-cron-builder]
 */
function cpw_cron_builder_shortcode( $atts ) {
	return '<cp-cron-builder></cp-cron-builder>';
}
add_shortcode( 'cp-cron-builder', 'cpw_cron_builder_shortcode' );

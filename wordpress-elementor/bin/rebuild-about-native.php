<?php
/**
 * Rebuild About page (# path about) with native Elementor widgets.
 * Run: wp eval-file wp-content/rsms-bin/rebuild-about-native.php
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

/**
 * @return string
 */
function rsms_el_nid(): string {
	return substr( bin2hex( random_bytes( 4 ) ), 0, 7 );
}

/**
 * @param string               $title Heading text.
 * @param string               $tag   h2|h3.
 * @return array<string, mixed>
 */
function rsms_el_heading( string $title, string $tag = 'h2' ): array {
	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'heading',
		'isInner'    => false,
		'settings'   => array(
			'title'            => $title,
			'header_size'      => $tag,
			'align'            => 'left',
			'title_color'      => ( 'h2' === $tag ) ? '#333333' : '#333333',
			'typography_typography' => 'custom',
			'typography_font_family' => '',
			'typography_font_size'   => array(
				'unit' => 'rem',
				'size' => ( 'h2' === $tag ) ? 2.75 : 1.25,
			),
			'typography_font_weight' => '600',
			'typography_line_height' => array(
				'unit' => 'rem',
				'size' => ( 'h2' === $tag ) ? 3.5 : 1.625,
			),
			'_margin'          => array(
				'unit'     => 'rem',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => ( 'h2' === $tag ) ? '1' : '0.5',
				'left'     => '0',
				'isLinked' => false,
			),
			'_padding'         => array(
				'unit'     => 'px',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
		),
		'elements'   => array(),
	);
}

/**
 * @param string $html Inner HTML (usually one <p>).
 * @return array<string, mixed>
 */
function rsms_el_text( string $html ): array {
	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'text-editor',
		'isInner'    => false,
		'settings'   => array(
			'editor'           => $html,
			'text_color'       => '#687A6B',
			'typography_typography' => 'custom',
			'typography_font_size'   => array(
				'unit' => 'rem',
				'size' => 1.25,
			),
			'typography_line_height' => array(
				'unit' => 'rem',
				'size' => 1.5,
			),
			'typography_font_weight' => '400',
			'_margin'          => array(
				'unit'     => 'rem',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '2',
				'left'     => '0',
				'isLinked' => false,
			),
			'_padding'         => array(
				'unit'     => 'px',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
		),
		'elements'   => array(),
	);
}

/**
 * Title IX row as Icon List (staff can edit text + URL in Elementor).
 *
 * @return array<string, mixed>
 */
function rsms_el_title_ix(): array {
	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'icon-list',
		'isInner'    => false,
		'settings'   => array(
			'_css_classes' => 'rsms-el-list-item about-list',
			'view'         => 'inline',
			'icon_align'   => 'left',
			'text_color'   => '#0A160C',
			'icon_color'   => '#F3B828',
			'icon_size'    => array(
				'unit' => 'rem',
				'size' => 1.25,
			),
			'icon_list'    => array(
				array(
					'text'       => 'Title IX Information',
					'selected_icon' => array(
						'value'   => 'fas fa-circle',
						'library' => 'fa-solid',
					),
					'link'       => array(
						'url'         => home_url( '/wp-content/uploads/2024/10/Title-IX-2024.pdf' ),
						'is_external' => 'on',
						'nofollow'    => '',
					),
					'_id'        => rsms_el_nid(),
				),
			),
			'_margin'      => array(
				'unit'     => 'rem',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
			'_padding'     => array(
				'unit'     => 'px',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
		),
		'elements'   => array(),
	);
}

$page = get_page_by_path( 'about', OBJECT, 'page' );
if ( ! $page ) {
	WP_CLI::error( 'About page not found' );
}

$widgets = array(
	rsms_el_heading( 'Mission and Vision', 'h2' ),
	rsms_el_text( '<p>The Mission of Rising Sun Montessori School is to provide an authentic Montessori school that embraces the diversity of our students, parents, and teachers. Our school community will nurture the individual needs of each child in a learning environment that encourages students to be self-directed, avid learners who are prepared for a diverse world.</p>' ),
	rsms_el_text( '<p>The Vision of RSMS is to implement an effective educational program that will sustain the Charter School’s mission for continued generations of RSMS students and families. To achieve this we envision a school that has:</p>' ),
	rsms_el_heading( 'High Standards', 'h3' ),
	rsms_el_text( '<p>Students are expected to adhere to high standards of student behavior and academic achievement; life-long guidelines are directly taught and modeled by staff. Students are expected to demonstrate these values in their schoolwork as well as their interactions with peers and adults.</p>' ),
	rsms_el_heading( 'Significant Student Support', 'h3' ),
	rsms_el_text( '<p>Smaller class sizes, and strong academic, social, and intervention support programs.</p>' ),
	rsms_el_heading( 'Talented Staff Sustained by Extensive Professional Development', 'h3' ),
	rsms_el_text( '<p>Our staff will improve their performance with a high emphasis on professional development goals, training and evaluation tools.</p>' ),
	rsms_el_heading( 'Parent and Community Involvement', 'h3' ),
	rsms_el_text( '<p>Parents will support their children and the Charter School by encouraging studying and reading at home, supporting good behavior at school, and participating in school activities and committees. Parents will be valued and included as members of the school culture. Parental input will be actively solicited. The school will continue to develop meaningful community partnerships to help sustain and deliver its educational mission.</p>' ),
	rsms_el_text( '<p>Rising Sun Montessori School is committed to strengthening the critical thinking and problem-solving skills of all students and encouraging an atmosphere of inquisitiveness and interaction, collaboration, entrepreneurship, communication and global awareness—all essential for the globally competitive, 21st-century student.</p>' ),
	rsms_el_title_ix(),
);

$document = array(
	array(
		'id'       => rsms_el_nid(),
		'elType'   => 'section',
		'isInner'  => false,
		'settings' => array(
			'layout'         => 'boxed',
			'content_width'  => array(
				'unit' => 'px',
				'size' => 1140,
			),
			'gap'            => 'no',
			'_css_classes'   => 'about container',
			'padding'        => array(
				'unit'     => 'px',
				'top'      => '80',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => false,
			),
			'margin'         => array(
				'unit'     => 'px',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
		),
		'elements' => array(
			array(
				'id'       => rsms_el_nid(),
				'elType'   => 'column',
				'isInner'  => false,
				'settings' => array(
					'_column_size' => 100,
					'_inline_size' => null,
					'padding'      => array(
						'unit'     => 'px',
						'top'      => '0',
						'right'    => '0',
						'bottom'   => '0',
						'left'     => '0',
						'isLinked' => true,
					),
				),
				'elements' => $widgets,
			),
		),
	),
);

$json = wp_json_encode( $document );

wp_update_post(
	array(
		'ID'           => (int) $page->ID,
		'post_content' => '',
	)
);

update_post_meta( (int) $page->ID, '_elementor_edit_mode', 'builder' );
update_post_meta( (int) $page->ID, '_elementor_template_type', 'wp-page' );
update_post_meta( (int) $page->ID, '_elementor_version', '3.0.0' );
update_post_meta( (int) $page->ID, '_elementor_data', wp_slash( $json ) );
update_post_meta( (int) $page->ID, '_elementor_page_settings', array() );
delete_post_meta( (int) $page->ID, '_elementor_css' );

if ( class_exists( '\Elementor\Plugin' ) ) {
	try {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	} catch ( Exception $e ) {
		WP_CLI::warning( $e->getMessage() );
	}
}

WP_CLI::success( 'About rebuilt with native Elementor widgets (#' . $page->ID . '). Structure: Heading + Text Editor + Icon List.' );
WP_CLI::log( 'Open: ' . admin_url( 'post.php?post=' . $page->ID . '&action=elementor' ) );

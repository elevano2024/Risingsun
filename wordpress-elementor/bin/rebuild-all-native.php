<?php
/**
 * Convert ALL theme content/*.html pages into native Elementor widgets.
 * Run: wp eval-file wp-content/rsms-bin/rebuild-all-native.php
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

$theme_dir   = get_theme_root() . '/rsms-elementor';
$content_dir = $theme_dir . '/content';

if ( ! is_dir( $content_dir ) ) {
	WP_CLI::error( "Missing content dir: {$content_dir}" );
}

/** @var int */
$GLOBALS['rsms_el_html_chunks'] = 0;

/**
 * Unique Elementor element id (7 hex chars).
 */
function rsms_el_nid(): string {
	return substr( bin2hex( random_bytes( 4 ) ), 0, 7 );
}

/**
 * @param string $stem Filename without .html
 */
function rsms_el_stem_to_path( string $stem ): string {
	static $roots = array(
		'about',
		'program',
		'school-information',
		'parents',
		'leadership',
	);

	if ( 'home' === $stem ) {
		return 'home';
	}

	foreach ( $roots as $root ) {
		$prefix = $root . '-';
		if ( 0 === strpos( $stem, $prefix ) ) {
			$rest = substr( $stem, strlen( $prefix ) );
			if ( 'about' === $root && 0 === strpos( $rest, 'meet-our-staff-' ) ) {
				$slug = substr( $rest, strlen( 'meet-our-staff-' ) );
				return 'about/meet-our-staff/' . $slug;
			}
			return $root . '/' . $rest;
		}
		if ( $stem === $root ) {
			return $root;
		}
	}

	return $stem;
}

/**
 * @param string $url Relative or absolute URL.
 */
function rsms_el_abs_url( string $url ): string {
	$url = trim( $url );
	if ( '' === $url ) {
		return '';
	}
	if ( preg_match( '#^(https?:|data:|mailto:|tel:)#i', $url ) ) {
		return $url;
	}
	if ( 0 === strpos( $url, '//' ) ) {
		return ( is_ssl() ? 'https:' : 'http:' ) . $url;
	}
	return home_url( $url );
}

/**
 * Absolutize src/href in an HTML fragment so HTML widgets work on any host.
 *
 * @param string $html HTML fragment.
 */
function rsms_el_html_abs( string $html ): string {
	return (string) preg_replace_callback(
		'/\b(src|href)=([\'"])([^\'"]+)\2/i',
		static function ( array $m ): string {
			$attr = $m[1];
			$q    = $m[2];
			$url  = $m[3];
			if ( '' === $url || '#' === $url[0] || preg_match( '#^(https?:|data:|mailto:|tel:|javascript:)#i', $url ) ) {
				return $m[0];
			}
			return $attr . '=' . $q . esc_url( rsms_el_abs_url( $url ) ) . $q;
		},
		$html
	);
}

/**
 * Whether a root child should stay as one HTML block (home layout CSS).
 *
 * @param DOMElement $el Element.
 */
function rsms_el_is_link_list_container( DOMElement $el ): bool {
	$links = 0;
	$other = 0;
	foreach ( $el->childNodes as $child ) {
		if ( ! ( $child instanceof DOMElement ) ) {
			if ( XML_TEXT_NODE === $child->nodeType && '' !== trim( $child->textContent ) ) {
				$other++;
			}
			continue;
		}
		if ( 'a' === strtolower( $child->tagName ) && rsms_el_has_class( $child, 'list-item' ) ) {
			$links++;
		} else {
			$other++;
		}
	}
	return $links >= 1 && 0 === $other;
}

/**
 * No page-level layout remains an HTML widget. Complex bands are rebuilt as
 * nested Elementor sections by rsms_el_convert_band_to_section().
 *
 * @param DOMElement $el Element.
 */
function rsms_el_is_layout_html_block( DOMElement $el ): bool {
	return false;
}

/**
 * Layout roots with dedicated native Elementor section builders.
 *
 * @param DOMElement $el Element.
 */
function rsms_el_is_native_layout_band( DOMElement $el ): bool {
	foreach ( array( 'home-section-2', 'gallery-section', 'gallery', 'contact-page', 'schoolMetricPerformance' ) as $class ) {
		if ( rsms_el_has_class( $el, $class ) ) {
			return true;
		}
	}
	return false;
}

/**
 * @deprecated Native band conversion caused home/program regressions — use HTML blocks.
 *
 * @param DOMElement $el Element.
 */
function rsms_el_is_layout_band( DOMElement $el ): bool {
	return rsms_el_is_layout_html_block( $el );
}

/**
 * One Elementor section wrapping a preserved HTML block.
 *
 * @param DOMElement $el Block element.
 * @param string     $extra_section_classes Page/root classes so nested CSS like
 *                   `.lowerElementry .home-section-2` still matches.
 * @return array<string, mixed>
 */
function rsms_el_build_html_block_section( DOMElement $el, string $extra_section_classes = '' ): array {
	/*
	 * Keep page wrappers (home, lowerElementry, …) so nested CSS matches, but NEVER
	 * put Bootstrap-like `.container` on the Elementor section — it adds max-width +
	 * side padding and leaves dark gutters. Inner HTML already carries `.container`.
	 */
	$extra = preg_replace( '/\bcontainer\b/', '', $extra_section_classes );
	$extra = trim( preg_replace( '/\s+/', ' ', (string) $extra ) );
	$classes = trim( 'rsms-el-html-block ' . $extra );
	return array(
		'id'       => rsms_el_nid(),
		'elType'   => 'section',
		'isInner'  => false,
		'settings' => array(
			'layout'        => 'full_width',
			'content_width' => array(
				'unit' => 'px',
				'size' => 1140,
			),
			'gap'           => 'no',
			'css_classes'   => $classes,
		),
		'elements' => array(
			array(
				'id'       => rsms_el_nid(),
				'elType'   => 'column',
				'isInner'  => false,
				'settings' => array(
					'_column_size' => 100,
					'_inline_size' => null,
				),
				'elements' => array(
					rsms_el_widget_html( rsms_el_html_abs( rsms_el_outer_html( $el ) ) ),
				),
			),
		),
	);
}

/**
 * Pack widgets into a top-level or inner Elementor section.
 *
 * @param list<array<string, mixed>> $elements Widgets and/or inner sections.
 * @param string                     $css_classes Section css_classes.
 * @param array<string, mixed>       $opts layout|is_inner|column_classes|content_width.
 * @return array<string, mixed>
 */
function rsms_el_pack_section( array $elements, string $css_classes = '', array $opts = array() ): array {
	$is_inner = ! empty( $opts['is_inner'] );
	$layout   = isset( $opts['layout'] ) ? (string) $opts['layout'] : ( false !== strpos( $css_classes, 'container' ) ? 'boxed' : 'full_width' );
	$col_cls  = isset( $opts['column_classes'] ) ? (string) $opts['column_classes'] : '';
	$width    = isset( $opts['content_width'] ) ? $opts['content_width'] : array(
		'unit' => 'rem',
		'size' => 71.25,
	);
	if ( is_int( $width ) ) {
		$width = array(
			'unit' => 'px',
			'size' => $width,
		);
	}

	$col_settings = array(
		'_column_size' => 100,
		'_inline_size' => null,
	);
	if ( '' !== $col_cls ) {
		$col_settings['css_classes'] = $col_cls;
	}

	return array(
		'id'       => rsms_el_nid(),
		'elType'   => 'section',
		'isInner'  => $is_inner,
		'settings' => array(
			'layout'        => $layout,
			'content_width' => array(
				'unit' => 'px',
				'size' => $width,
			),
			'gap'           => 'no',
			'css_classes'   => $css_classes,
		),
		'elements' => array(
			array(
				'id'       => rsms_el_nid(),
				'elType'   => 'column',
				'isInner'  => $is_inner,
				'settings' => $col_settings,
				'elements' => $elements,
			),
		),
	);
}

/**
 * Multi-column inner section (e.g. cloud row, metrics grid).
 *
 * @param list<list<array<string, mixed>>> $columns_widgets Widgets per column.
 * @param string                           $section_classes Section classes.
 * @param list<string>                     $column_classes Per-column classes (optional).
 * @return array<string, mixed>
 */
function rsms_el_pack_multi_column_section( array $columns_widgets, string $section_classes, array $column_classes = array() ): array {
	$count   = max( 1, count( $columns_widgets ) );
	$col_pct = (int) floor( 100 / $count );
	$cols    = array();
	foreach ( $columns_widgets as $i => $widgets ) {
		$settings = array(
			'_column_size' => $col_pct,
			'_inline_size' => $col_pct,
		);
		if ( isset( $column_classes[ $i ] ) && '' !== $column_classes[ $i ] ) {
			$settings['css_classes'] = $column_classes[ $i ];
		}
		$cols[] = array(
			'id'       => rsms_el_nid(),
			'elType'   => 'column',
			'isInner'  => true,
			'settings' => $settings,
			'elements' => $widgets,
		);
	}

	return array(
		'id'       => rsms_el_nid(),
		'elType'   => 'section',
		'isInner'  => true,
		'settings' => array(
			'layout'        => 'boxed',
			'content_width' => array(
				'unit' => 'px',
				'size' => 1140,
			),
			'gap'           => 'no',
			'css_classes'   => $section_classes,
		),
		'elements' => $cols,
	);
}

/**
 * @param DOMElement $el Element.
 * @param string     $class Class token.
 */
function rsms_el_has_class( DOMElement $el, string $class ): bool {
	$classes = preg_split( '/\s+/', trim( $el->getAttribute( 'class' ) ) );
	return in_array( $class, $classes ? $classes : array(), true );
}

/**
 * @param DOMElement $el Element.
 * @return list<string>
 */
function rsms_el_class_list( DOMElement $el ): array {
	$raw = trim( $el->getAttribute( 'class' ) );
	if ( '' === $raw ) {
		return array();
	}
	$parts = preg_split( '/\s+/', $raw );
	return $parts ? array_values( array_filter( $parts ) ) : array();
}

/**
 * @param DOMNode $node Node.
 */
function rsms_el_inner_html( DOMNode $node ): string {
	$html = '';
	foreach ( $node->childNodes as $child ) {
		$html .= $node->ownerDocument->saveHTML( $child );
	}
	return $html;
}

/**
 * @param DOMNode $node Node.
 */
function rsms_el_outer_html( DOMNode $node ): string {
	return $node->ownerDocument->saveHTML( $node );
}

/**
 * @param DOMNode $node Node.
 * @return list<DOMElement>
 */
function rsms_el_element_children( DOMNode $node ): array {
	$out = array();
	foreach ( $node->childNodes as $child ) {
		if ( $child instanceof DOMElement ) {
			$out[] = $child;
		}
	}
	return $out;
}

/**
 * Extract px size from inline style property.
 *
 * @param string $style Full style attribute.
 * @param string $prop  CSS property name.
 */
function rsms_el_style_px( string $style, string $prop ): ?int {
	if ( ! preg_match( '/' . preg_quote( $prop, '/' ) . '\s*:\s*(\d+)px/i', $style, $m ) ) {
		return null;
	}
	return (int) $m[1];
}

/**
 * @param string               $title Heading text.
 * @param string               $tag   h1–h6.
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_heading( string $title, string $tag = 'h2', array $extra = array() ): array {
	$settings = array_merge(
		array(
			'title'       => $title,
			'header_size' => $tag,
			'align'       => 'left',
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'heading',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param string               $html  Inner HTML.
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_text( string $html, array $extra = array() ): array {
	$settings = array_merge(
		array(
			'editor' => $html,
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'text-editor',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param string               $url   Image URL (absolute preferred).
 * @param string               $alt   Alt text.
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_image( string $url, string $alt = '', array $extra = array() ): array {
	$settings = array_merge(
		array(
			'image'         => array(
				'url' => rsms_el_abs_url( $url ),
				'id'  => '',
				'alt' => $alt,
			),
			'image_size'    => 'full',
			'link_to'       => 'none',
			'caption_source'=> 'none',
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'image',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param list<array{text:string,url:string,external?:bool}> $items List rows.
 * @param array<string, mixed>                               $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_icon_list( array $items, array $extra = array() ): array {
	$icon_list = array();
	foreach ( $items as $item ) {
		$url      = isset( $item['url'] ) ? (string) $item['url'] : '';
		$external = ! empty( $item['external'] );
		if ( $url && 0 === strpos( $url, '/' ) && 0 !== strpos( $url, '//' ) ) {
			$url = rsms_el_abs_url( $url );
		}
		$row = array(
			'text'          => (string) $item['text'],
			'selected_icon' => array(
				'value'   => array(
					'url' => home_url( '/wp-content/uploads/rsms-static/images/yellowdot.svg' ),
					'id'  => '',
				),
				'library' => 'svg',
			),
			'_id'           => rsms_el_nid(),
		);
		if ( $url ) {
			$row['link'] = array(
				'url'         => $url,
				'is_external' => $external ? 'on' : '',
				'nofollow'    => '',
			);
		}
		$icon_list[] = $row;
	}

	$settings = array_merge(
		array(
			'_css_classes' => 'rsms-el-list-item',
			'view'         => 'traditional',
			'icon_align'   => 'left',
			'icon_list'    => $icon_list,
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'icon-list',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param string               $text  Button label.
 * @param string               $url   Link URL.
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_button( string $text, string $url, array $extra = array() ): array {
	if ( $url && 0 === strpos( $url, '/' ) && 0 !== strpos( $url, '//' ) ) {
		$url = rsms_el_abs_url( $url );
	}
	$settings = array_merge(
		array(
			'text'         => $text,
			'link'         => array(
				'url'         => $url,
				'is_external' => ( 0 === strpos( $url, 'mailto:' ) || 0 === strpos( $url, 'tel:' ) ) ? '' : '',
				'nofollow'    => '',
			),
			'size'         => 'sm',
			'button_type'  => 'default',
			'_css_classes' => '',
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'button',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_divider( array $extra = array() ): array {
	$settings = array_merge(
		array(
			'style'        => 'solid',
			'weight'       => array(
				'unit' => 'px',
				'size' => 2,
			),
			'_css_classes' => 'rsms-el-hr',
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'divider',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * @param string               $title Title.
 * @param string               $desc  Description.
 * @param array<string, mixed> $extra Extra settings (icon, link, classes…).
 * @return array<string, mixed>
 */
function rsms_el_widget_icon_box( string $title, string $desc, array $extra = array() ): array {
	$settings = array_merge(
		array(
			'title_text'       => $title,
			'description_text' => $desc,
			'title_size'       => 'h3',
			'position'         => 'inline-start',
			'selected_icon'    => array(
				'value'   => array(
					'url' => home_url( '/wp-content/uploads/rsms-static/images/headd.svg' ),
					'id'  => '',
				),
				'library' => 'svg',
			),
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'icon-box',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * Image Box — use for real photos/SVGs (Icon Box library=svg needs media IDs).
 *
 * @param string               $title Title.
 * @param string               $desc  Description HTML/text.
 * @param string               $image_url Absolute or site-relative image URL.
 * @param array<string, mixed> $extra Extra settings (link, position, classes, alt…).
 * @return array<string, mixed>
 */
function rsms_el_widget_image_box( string $title, string $desc, string $image_url, array $extra = array() ): array {
	$alt = '';
	if ( isset( $extra['image_alt'] ) ) {
		$alt = (string) $extra['image_alt'];
		unset( $extra['image_alt'] );
	}

	$settings = array_merge(
		array(
			'title_text'       => $title,
			'description_text' => $desc,
			'title_size'       => 'h3',
			'position'         => 'top',
			'image'            => array(
				'url' => rsms_el_abs_url( $image_url ),
				'id'  => '',
				'alt' => $alt,
			),
			'image_size'       => 'full',
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'image-box',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * Page style bands kept as native Elementor (inner) sections so CSS hooks
 * like .tk-header / .tkDetail still apply while widgets stay editable.
 *
 * @param DOMElement $el Element.
 */
function rsms_el_is_style_section_wrapper( DOMElement $el ): bool {
	foreach ( array( 'tk-header', 'tkDetail', 'rsms-header', 'detailsContact' ) as $class ) {
		if ( rsms_el_has_class( $el, $class ) ) {
			return true;
		}
	}
	return false;
}

/**
 * @param DOMElement $el Style wrapper.
 * @return array<string, mixed>
 */
function rsms_el_convert_style_section_wrapper( DOMElement $el ): array {
	$classes = rsms_el_class_list( $el );
	$convert_from = $el;
	$kids         = rsms_el_element_children( $el );
	if ( 1 === count( $kids ) && rsms_el_has_class( $kids[0], 'container' ) ) {
		$convert_from = $kids[0];
	}
	// Never put .container on the Elementor section — use boxed layout instead.
	$classes = array_values(
		array_filter(
			$classes,
			static function ( $c ) {
				return 'container' !== $c;
			}
		)
	);
	$widgets = rsms_el_convert_children( $convert_from );
	return rsms_el_pack_section(
		$widgets,
		implode( ' ', $classes ),
		array(
			'is_inner' => true,
			'layout'   => 'full_width',
		)
	);
}

/**
 * Fail loudly instead of silently creating a raw HTML widget.
 *
 * This keeps future source changes from undoing the native Elementor
 * conversion. Add a native converter for the new markup before rebuilding.
 *
 * @param string $html Unsupported HTML chunk.
 * @return array<string, mixed>
 */
function rsms_el_widget_html( string $html ): array {
	throw new RuntimeException(
		'Unsupported markup requires a native Elementor converter: ' .
		wp_strip_all_tags( substr( $html, 0, 240 ) )
	);
}

/**
 * Elementor Free Video widget (YouTube).
 *
 * @param string               $youtube_url Watch or embed URL.
 * @param array<string, mixed> $extra Extra settings.
 * @return array<string, mixed>
 */
function rsms_el_widget_video( string $youtube_url, array $extra = array() ): array {
	$settings = array_merge(
		array(
			'video_type'  => 'youtube',
			'youtube_url' => $youtube_url,
		),
		$extra
	);

	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'video',
		'isInner'    => false,
		'settings'   => $settings,
		'elements'   => array(),
	);
}

/**
 * Editable RSMS PDF Preview custom Elementor widget.
 *
 * @param string $url   PDF URL.
 * @param string $title Accessible title.
 * @param string $text  Optional baked fallback text.
 * @return array<string, mixed>
 */
function rsms_el_widget_pdf( string $url, string $title = 'PDF preview', string $text = '' ): array {
	return array(
		'id'         => rsms_el_nid(),
		'elType'     => 'widget',
		'widgetType' => 'rsms-pdf-preview',
		'isInner'    => false,
		'settings'   => array(
			'pdf_url'      => array(
				'url'         => rsms_el_abs_url( $url ),
				'is_external' => '',
				'nofollow'    => '',
			),
			'pdf_title'    => $title,
			'fallback_text'=> $text,
			'_css_classes' => 'rsms-pdf-elementor-widget',
		),
		'elements'   => array(),
	);
}

/**
 * Convert YouTube iframe src → watch URL for Video widget.
 *
 * @param string $src iframe src.
 */
function rsms_el_youtube_watch_url( string $src ): string {
	if ( preg_match( '#(?:youtube\.com/embed/|youtu\.be/)([A-Za-z0-9_-]+)#', $src, $m ) ) {
		return 'https://www.youtube.com/watch?v=' . $m[1];
	}
	return $src;
}

/**
 * Cloud CTA cell → heading + text + button (column gets .cloudItem).
 *
 * @param DOMElement $el .cloudItem
 * @return list<array<string, mixed>>
 */
function rsms_el_convert_cloud_item( DOMElement $el ): array {
	$line1 = '';
	$line2 = '';
	$cta   = '';
	$href  = '';
	foreach ( rsms_el_element_children( $el ) as $child ) {
		$tag = strtolower( $child->tagName );
		if ( ( 'span' === $tag || 'div' === $tag ) && rsms_el_has_class( $child, 'cloudItem1' ) ) {
			$line1 = trim( $child->textContent );
		} elseif ( ( 'span' === $tag || 'div' === $tag ) && rsms_el_has_class( $child, 'cloudItem2' ) ) {
			$line2 = trim( $child->textContent );
		} elseif ( 'a' === $tag && rsms_el_has_class( $child, 'cloudItem3' ) ) {
			$href = $child->getAttribute( 'href' );
			// Strip nested img text noise.
			$cta = trim( preg_replace( '/\s+/', ' ', $child->textContent ) );
		}
	}
	$widgets = array();
	if ( '' !== $line1 ) {
		$widgets[] = rsms_el_widget_text(
			'<p class="cloudItem1">' . esc_html( $line1 ) . '</p>',
			array( '_css_classes' => 'cloudItem1' )
		);
	}
	if ( '' !== $line2 ) {
		$widgets[] = rsms_el_widget_heading(
			$line2,
			'h3',
			array( '_css_classes' => 'cloudItem2' )
		);
	}
	if ( '' !== $cta && '' !== $href ) {
		$widgets[] = rsms_el_widget_button(
			$cta,
			$href,
			array( '_css_classes' => 'cloudItem3' )
		);
	}
	return $widgets;
}

/**
 * Metric card → Image Box with link.
 *
 * @param DOMElement $el .metric-container
 * @return list<array<string, mixed>>
 */
function rsms_el_convert_metric_container( DOMElement $el ): array {
	$href  = '';
	$img   = '';
	$alt   = '';
	$title = 'View Details';
	foreach ( $el->getElementsByTagName( 'a' ) as $a ) {
		if ( $a instanceof DOMElement ) {
			$href = $a->getAttribute( 'href' );
			break;
		}
	}
	foreach ( $el->getElementsByTagName( 'img' ) as $img_el ) {
		if ( $img_el instanceof DOMElement ) {
			$img = $img_el->getAttribute( 'src' );
			$alt = $img_el->getAttribute( 'alt' );
			break;
		}
	}
	foreach ( $el->getElementsByTagName( 'span' ) as $span ) {
		if ( $span instanceof DOMElement && rsms_el_has_class( $span, 'metric_title' ) ) {
			$title = trim( $span->textContent );
			break;
		}
	}
	if ( '' === $img ) {
		return array( rsms_el_widget_html( rsms_el_outer_html( $el ) ) );
	}
	$extra = array(
		'_css_classes' => 'metric-container rsms-el-metric',
		'image_alt'    => $alt,
		'position'     => 'top',
	);
	if ( $href ) {
		$extra['link'] = array(
			'url'         => rsms_el_abs_url( $href ),
			'is_external' => 'on',
			'nofollow'    => '',
		);
	}
	return array( rsms_el_widget_image_box( $title, '', $img, $extra ) );
}

/**
 * Home / program wave band with optional cloud CTAs.
 *
 * @param DOMElement $el .home-section-2
 * @return array<string, mixed>
 */
function rsms_el_convert_home_section_2_band( DOMElement $el ): array {
	$bg = null;
	foreach ( rsms_el_element_children( $el ) as $child ) {
		if ( rsms_el_has_class( $child, 'bgtest' ) ) {
			$bg = $child;
			break;
		}
	}
	$scope = $bg ? $bg : $el;

	$container = null;
	foreach ( rsms_el_element_children( $scope ) as $child ) {
		if ( rsms_el_has_class( $child, 'container' ) ) {
			$container = $child;
			break;
		}
	}
	$scope = $container ? $container : $scope;

	$before  = array();
	$clouds  = null;
	foreach ( rsms_el_element_children( $scope ) as $child ) {
		if ( rsms_el_has_class( $child, 'clouds' ) ) {
			$clouds = $child;
			continue;
		}
		if ( rsms_el_has_class( $child, 'grid3x' ) ) {
			// Program feature cards inside wave — keep as converted image-boxes in a multi-col row.
			$card_cols = array();
			$col_cls   = array();
			foreach ( rsms_el_element_children( $child ) as $card ) {
				$card_cols[] = rsms_el_convert_element( $card );
				$col_cls[]   = 'rsms-el-grid3x-item';
			}
			if ( $card_cols ) {
				$before[] = rsms_el_pack_multi_column_section( $card_cols, 'grid3x', $col_cls );
			}
			continue;
		}
		foreach ( rsms_el_convert_element( $child ) as $w ) {
			$before[] = $w;
		}
	}

	if ( $clouds ) {
		$col_widgets = array();
		$col_classes = array();
		foreach ( rsms_el_element_children( $clouds ) as $item ) {
			if ( ! rsms_el_has_class( $item, 'cloudItem' ) ) {
				continue;
			}
			$col_widgets[] = rsms_el_convert_cloud_item( $item );
			$col_classes[] = 'cloudItem';
		}
		if ( $col_widgets ) {
			$before[] = rsms_el_pack_multi_column_section( $col_widgets, 'clouds', $col_classes );
		}
	}

	$col_cls = $bg ? 'bgtest' : '';
	if ( $container ) {
		$col_cls = trim( $col_cls . ' container' );
	}

	return rsms_el_pack_section(
		$before,
		'home-section-2',
		array(
			'layout'          => 'full_width',
			'column_classes'  => $col_cls,
		)
	);
}

/**
 * Metrics logo grid band.
 *
 * @param DOMElement $el .schoolMetricPerformance
 * @return array<string, mixed>
 */
function rsms_el_convert_metrics_band( DOMElement $el ): array {
	$list = null;
	foreach ( rsms_el_element_children( $el ) as $child ) {
		if ( rsms_el_has_class( $child, 'metricsListContainer' ) || rsms_el_has_class( $child, 'container' ) ) {
			$list = $child;
			break;
		}
	}
	$scope   = $list ? $list : $el;
	$columns = array();
	$col_cls = array();
	foreach ( rsms_el_element_children( $scope ) as $child ) {
		if ( rsms_el_has_class( $child, 'metric-container' ) ) {
			$columns[] = rsms_el_convert_metric_container( $child );
			$col_cls[] = 'metric-container';
		}
	}
	$inner = $columns
		? array( rsms_el_pack_multi_column_section( $columns, 'metricsListContainer container', $col_cls ) )
		: rsms_el_convert_children( $el );

	return rsms_el_pack_section( $inner, 'schoolMetricPerformance', array( 'layout' => 'boxed' ) );
}

/**
 * Convert a layout band element into one Elementor section.
 *
 * @param DOMElement $el Band root.
 * @return array<string, mixed>
 */
function rsms_el_convert_band_to_section( DOMElement $el ): array {
	if ( rsms_el_has_class( $el, 'home-section-2' ) ) {
		return rsms_el_convert_home_section_2_band( $el );
	}
	if ( rsms_el_has_class( $el, 'schoolMetricPerformance' ) ) {
		return rsms_el_convert_metrics_band( $el );
	}
	if ( rsms_el_has_class( $el, 'gallery-section' ) ) {
		return rsms_el_convert_gallery_section_band( $el );
	}
	if ( rsms_el_has_class( $el, 'gallery' ) ) {
		return rsms_el_convert_gallery_page_band( $el );
	}
	if ( rsms_el_has_class( $el, 'contact-page' ) ) {
		return rsms_el_convert_contact_band( $el );
	}

	$classes = trim( $el->getAttribute( 'class' ) );
	$widgets = rsms_el_convert_children( $el );
	$layout  = ( rsms_el_has_class( $el, 'home-section-1' ) || rsms_el_has_class( $el, 'home-section-2' ) )
		? 'full_width'
		: 'boxed';

	return rsms_el_pack_section( $widgets, $classes, array( 'layout' => $layout ) );
}

/**
 * Home “View All Photos” mosaic (3 columns of tiles).
 *
 * @param DOMElement $el .gallery-section
 * @return array<string, mixed>
 */
function rsms_el_convert_gallery_section_band( DOMElement $el ): array {
	$col_widgets = array();
	$col_classes = array();
	foreach ( rsms_el_element_children( $el ) as $child ) {
		if ( ! rsms_el_has_class( $child, 'image-container' ) ) {
			foreach ( rsms_el_convert_element( $child ) as $w ) {
				// Rare non-column child — ignore structural noise.
				unset( $w );
			}
			continue;
		}
		$col_widgets[] = rsms_el_convert_children( $child );
		$col_classes[] = 'image-container';
	}
	if ( ! $col_widgets ) {
		return rsms_el_pack_section( rsms_el_convert_children( $el ), 'gallery-section container', array( 'layout' => 'boxed' ) );
	}
	$sec            = rsms_el_pack_multi_column_section( $col_widgets, 'gallery-section container', $col_classes );
	$sec['isInner'] = false;
	foreach ( $sec['elements'] as &$col ) {
		$col['isInner'] = false;
	}
	unset( $col );
	return $sec;
}

/**
 * Full gallery page image grid.
 *
 * @param DOMElement $el .gallery
 * @return array<string, mixed>
 */
function rsms_el_convert_gallery_page_band( DOMElement $el ): array {
	$widgets = array();
	foreach ( rsms_el_element_children( $el ) as $child ) {
		foreach ( rsms_el_convert_element( $child ) as $w ) {
			$widgets[] = $w;
		}
	}
	return rsms_el_pack_section(
		$widgets,
		trim( $el->getAttribute( 'class' ) ),
		array( 'layout' => 'boxed' )
	);
}

/**
 * Find the first direct child carrying a class.
 *
 * @param DOMNode $parent Parent node.
 * @param string  $class  Class token.
 */
function rsms_el_direct_child_by_class( DOMNode $parent, string $class ): ?DOMElement {
	foreach ( rsms_el_element_children( $parent ) as $child ) {
		if ( rsms_el_has_class( $child, $class ) ) {
			return $child;
		}
	}
	return null;
}

/**
 * Turn a top-level section into an inner section for the native home wrapper.
 *
 * @param array<string, mixed> $section Elementor section.
 * @return array<string, mixed>
 */
function rsms_el_home_inner_section( array $section ): array {
	$section['isInner'] = true;
	foreach ( $section['elements'] as &$column ) {
		$column['isInner'] = true;
	}
	unset( $column );
	return $section;
}

/**
 * Put the editable wave contents inside a real container while the green
 * .bgtest column remains full bleed.
 *
 * @param DOMElement $el .home-section-2.
 * @return array<string, mixed>
 */
function rsms_el_convert_native_home_wave_band( DOMElement $el ): array {
	$section  = rsms_el_convert_home_section_2_band( $el );
	$widgets  = $section['elements'][0]['elements'];
	$content  = rsms_el_pack_section(
		$widgets,
		'container rsms-home-wave-content',
		array( 'is_inner' => true, 'layout' => 'boxed' )
	);
	$section['elements'][0]['settings']['css_classes'] = 'bgtest';
	$section['elements'][0]['elements']                = array( $content );
	return rsms_el_home_inner_section( $section );
}

/**
 * Native Elementor version of the first home band.
 *
 * @param DOMElement $el .home-section-1.
 * @return array<string, mixed>
 */
function rsms_el_convert_home_intro_band( DOMElement $el ): array {
	$accreditation = rsms_el_direct_child_by_class( $el, 'home-section-1-content-1' );
	$intro         = rsms_el_direct_child_by_class( $el, 'home-section-1-content-2' );
	$elements      = array();

	if ( $accreditation ) {
		$linksection = rsms_el_direct_child_by_class( $accreditation, 'linksection' );
		$link_widget = array();
		$cta_widget  = array();

		if ( $linksection ) {
			$img = $linksection->getElementsByTagName( 'img' )->item( 0 );
			if ( $img instanceof DOMElement ) {
				$link_widget[] = rsms_el_widget_image(
					$img->getAttribute( 'src' ),
					$img->getAttribute( 'alt' ),
					array( '_css_classes' => 'rsms-home-accreditation-logo' )
				);
			}
			$text = rsms_el_direct_child_by_class( $linksection, 'linksection-text' );
			if ( $text ) {
				$heading = $text->getElementsByTagName( 'h2' )->item( 0 );
				$copy    = $text->getElementsByTagName( 'p' )->item( 0 );
				if ( $heading instanceof DOMElement ) {
					$link_widget[] = rsms_el_widget_heading(
						trim( $heading->textContent ),
						'h2',
						array( '_css_classes' => 'rsms-home-accreditation-title' )
					);
				}
				if ( $copy instanceof DOMElement ) {
					$link_widget[] = rsms_el_widget_text(
						'<p>' . esc_html( trim( $copy->textContent ) ) . '</p>',
						array( '_css_classes' => 'rsms-home-accreditation-copy' )
					);
				}
			}
		}

		$link = $accreditation->getElementsByTagName( 'a' )->item( 0 );
		if ( $link instanceof DOMElement ) {
			$cta_widget[] = rsms_el_widget_button(
				trim( $link->textContent ),
				$link->getAttribute( 'href' ),
				array( '_css_classes' => 'linksection-link' )
			);
		}

		$row = rsms_el_pack_multi_column_section(
			array( $link_widget, $cta_widget ),
			'home-section-1-content-1 container',
			array( 'linksection', 'linksection-link-column' )
		);
		$row['elements'][0]['settings']['_column_size'] = 75;
		$row['elements'][0]['settings']['_inline_size'] = 75;
		$row['elements'][1]['settings']['_column_size'] = 25;
		$row['elements'][1]['settings']['_inline_size'] = 25;
		$elements[] = $row;
	}

	if ( $intro ) {
		$intro_widgets = array();
		foreach ( rsms_el_element_children( $intro ) as $child ) {
			if ( 'h1' === strtolower( $child->tagName ) ) {
				$intro_widgets[] = rsms_el_widget_heading( trim( $child->textContent ), 'h1' );
				continue;
			}
			if ( ! rsms_el_has_class( $child, 'home-section-1-content-2-listitems' ) ) {
				continue;
			}

			$columns = rsms_el_element_children( $child );
			$left    = isset( $columns[0] ) ? rsms_el_convert_children( $columns[0] ) : array();
			$right   = array();
			if ( isset( $columns[1] ) ) {
				$paragraphs = array();
				foreach ( $columns[1]->getElementsByTagName( 'p' ) as $paragraph ) {
					if ( $paragraph instanceof DOMElement ) {
						$paragraphs[] = '<p>' . esc_html( trim( $paragraph->textContent ) ) . '</p>';
					}
				}
				if ( $paragraphs ) {
					$right[] = rsms_el_widget_text( implode( '', $paragraphs ), array( '_css_classes' => 'rsms-home-intro-copy' ) );
				}
			}
			$intro_widgets[] = rsms_el_pack_multi_column_section(
				array( $left, $right ),
				'home-section-1-content-2-listitems',
				array( 'rsms-home-program-links', 'rsms-home-intro-text' )
			);
		}
		$elements[] = rsms_el_pack_section(
			$intro_widgets,
			'home-section-1-content-2 container',
			array( 'is_inner' => true, 'layout' => 'boxed' )
		);
	}

	return rsms_el_pack_section(
		$elements,
		'home-section-1',
		array( 'is_inner' => true, 'layout' => 'full_width' )
	);
}

/**
 * Native Elementor version of the reusable classroom copy band.
 *
 * @param DOMElement $el .home-section-5.
 * @return array<string, mixed>
 */
function rsms_el_convert_home_copy_band( DOMElement $el ): array {
	$widgets    = array();
	$paragraphs = array();
	foreach ( rsms_el_element_children( $el ) as $child ) {
		$tag = strtolower( $child->tagName );
		if ( 'h1' === $tag ) {
			$widgets[] = rsms_el_widget_heading( trim( $child->textContent ), 'h1' );
		} elseif ( 'p' === $tag ) {
			$paragraphs[] = '<p>' . esc_html( trim( $child->textContent ) ) . '</p>';
		} elseif ( 'a' === $tag && rsms_el_has_class( $child, 'yellowLink' ) ) {
			if ( $paragraphs ) {
				$widgets[]  = rsms_el_widget_text( implode( '', $paragraphs ) );
				$paragraphs = array();
			}
			$widgets[] = rsms_el_widget_button(
				trim( preg_replace( '/\s+/', ' ', $child->textContent ) ),
				$child->getAttribute( 'href' ),
				array( '_css_classes' => 'yellowLink' )
			);
		}
	}
	if ( $paragraphs ) {
		$widgets[] = rsms_el_widget_text( implode( '', $paragraphs ) );
	}

	$section = rsms_el_pack_section(
		$widgets,
		'home-section-5 container',
		array( 'is_inner' => true, 'layout' => 'boxed' )
	);
	$margin_bottom = rsms_el_style_px( $el->getAttribute( 'style' ), 'margin-bottom' );
	if ( null !== $margin_bottom ) {
		$section['settings']['margin'] = array(
			'unit'     => 'px',
			'top'      => '0',
			'right'    => '0',
			'bottom'   => (string) $margin_bottom,
			'left'     => '0',
			'isLinked' => false,
		);
	}
	return $section;
}

/**
 * Native Elementor version of a contact strip.
 *
 * @param DOMElement $el .contact-page.
 * @param bool       $is_inner Whether to nest inside the native home wrapper.
 * @return array<string, mixed>
 */
function rsms_el_convert_contact_band( DOMElement $el, bool $is_inner = false ): array {
	$container = rsms_el_direct_child_by_class( $el, 'contact-container' );
	$scope     = $container ? $container : $el;
	$widgets   = array();
	$heading   = $scope->getElementsByTagName( 'h1' )->item( 0 );
	if ( $heading instanceof DOMElement ) {
		$widgets[] = rsms_el_widget_heading( trim( $heading->textContent ), 'h1' );
	}

	$widgets[] = rsms_el_widget_heading( 'Give us a call', 'h3', array( '_css_classes' => 'giveCall' ) );
	$phone_widgets = array();
	foreach ( $scope->getElementsByTagName( 'a' ) as $link ) {
		if ( ! ( $link instanceof DOMElement ) || ! rsms_el_has_class( $link, 'contact-number' ) ) {
			continue;
		}
		$phone_widgets[] = array(
			rsms_el_widget_button(
				trim( $link->textContent ),
				$link->getAttribute( 'href' ),
				array(
					'_css_classes'  => 'contact-number rsms-el-contact-number',
					'selected_icon' => array( 'value' => 'fas fa-phone-alt', 'library' => 'fa-solid' ),
					'icon_align'    => 'left',
				)
			),
		);
	}
	if ( $phone_widgets ) {
		$phone_classes = array_fill( 0, count( $phone_widgets ), 'contact-numbers' );
		$widgets[] = rsms_el_pack_multi_column_section( $phone_widgets, 'contact-phone', $phone_classes );
	}

	$data = rsms_el_direct_child_by_class( $scope, 'contact-data' );
	if ( $data ) {
		$widgets[] = rsms_el_widget_text(
			'<p>' . rsms_el_inner_html( $data ) . '</p>',
			array( '_css_classes' => 'contact-data' )
		);
	}

	$address = rsms_el_direct_child_by_class( $scope, 'contact-address' );
	if ( $address ) {
		$widgets[] = rsms_el_widget_text(
			'<p>' . rsms_el_inner_html( $address ) . '</p>',
			array( '_css_classes' => 'contact-address' )
		);
	}

	$button_row = rsms_el_direct_child_by_class( $scope, 'contact-buttons' );
	if ( $button_row ) {
		$button_columns = array();
		$button_classes = array();
		foreach ( $button_row->getElementsByTagName( 'a' ) as $link ) {
			if ( ! ( $link instanceof DOMElement ) ) {
				continue;
			}
			$class = rsms_el_has_class( $link, 'direction-button' ) ? 'direction-button' : 'fill-form-button';
			$button_columns[] = array(
				rsms_el_widget_button(
					trim( preg_replace( '/\s+/', ' ', $link->textContent ) ),
					$link->getAttribute( 'href' ),
					array( '_css_classes' => $class )
				),
			);
			$button_classes[] = $class . '-column';
		}
		if ( $button_columns ) {
			$widgets[] = rsms_el_pack_multi_column_section( $button_columns, 'contact-buttons', $button_classes );
		}
	}

	return rsms_el_pack_section(
		$widgets,
		'contact-page',
		array( 'is_inner' => $is_inner, 'layout' => 'full_width', 'column_classes' => 'container contact-container' )
	);
}

/**
 * Home contact strip remains nested in the single native home document.
 *
 * @param DOMElement $el .contact-page.
 * @return array<string, mixed>
 */
function rsms_el_convert_home_contact_band( DOMElement $el ): array {
	return rsms_el_convert_contact_band( $el, true );
}

/**
 * Build the front page as a native Elementor hierarchy (no HTML widgets).
 *
 * @param DOMElement $root .home wrapper.
 * @return array<int, array<string, mixed>>
 */
function rsms_el_build_native_home_document( DOMElement $root ): array {
	$bands = array();
	foreach ( rsms_el_element_children( $root ) as $child ) {
		if ( rsms_el_has_class( $child, 'home-section-1' ) ) {
			$bands[] = rsms_el_convert_home_intro_band( $child );
		} elseif ( rsms_el_has_class( $child, 'home-section-2' ) ) {
			$bands[] = rsms_el_convert_native_home_wave_band( $child );
		} elseif ( rsms_el_has_class( $child, 'home-section-5' ) ) {
			$bands[] = rsms_el_convert_home_copy_band( $child );
		} elseif ( rsms_el_has_class( $child, 'gallery-section' ) ) {
			$bands[] = rsms_el_home_inner_section( rsms_el_convert_gallery_section_band( $child ) );
		} elseif ( rsms_el_has_class( $child, 'contact-page' ) ) {
			$bands[] = rsms_el_convert_home_contact_band( $child );
		}
	}

	return array(
		rsms_el_pack_section( $bands, 'home rsms-el-native-home', array( 'layout' => 'full_width' ) ),
	);
}

/**
 * Simple linked list-item (title + dot + arrow), not image+content cards.
 *
 * @param DOMElement $el Anchor.
 */
function rsms_el_is_simple_list_item( DOMElement $el ): bool {
	if ( 'a' !== strtolower( $el->tagName ) ) {
		return false;
	}
	if ( ! rsms_el_has_class( $el, 'list-item' ) ) {
		return false;
	}
	// Complex program cards use div.list-item with list-item__image.
	foreach ( $el->getElementsByTagName( '*' ) as $child ) {
		if ( $child instanceof DOMElement && rsms_el_has_class( $child, 'list-item__image' ) ) {
			return false;
		}
	}
	$title = null;
	foreach ( $el->getElementsByTagName( '*' ) as $child ) {
		if ( $child instanceof DOMElement && rsms_el_has_class( $child, 'list-item__title' ) ) {
			$title = trim( $child->textContent );
			break;
		}
	}
	return null !== $title && '' !== $title;
}

/**
 * @param DOMElement $el Simple list-item anchor.
 * @return array{text:string,url:string,external:bool}
 */
function rsms_el_parse_simple_list_item( DOMElement $el ): array {
	$text = '';
	foreach ( $el->getElementsByTagName( '*' ) as $child ) {
		if ( $child instanceof DOMElement && rsms_el_has_class( $child, 'list-item__title' ) ) {
			$text = trim( $child->textContent );
			break;
		}
	}
	if ( '' === $text ) {
		$text = trim( $el->textContent );
	}
	$href     = $el->getAttribute( 'href' );
	$external = ( 'blank' === strtolower( $el->getAttribute( 'target' ) ) )
		|| ( '_blank' === strtolower( $el->getAttribute( 'target' ) ) );

	return array(
		'text'     => $text,
		'url'      => $href,
		'external' => $external,
	);
}

/**
 * @param DOMElement $el detailCard1 block.
 * @return array<string, mixed>|null
 */
function rsms_el_convert_detail_card( DOMElement $el ): ?array {
	$title = '';
	$desc  = '';
	$icon  = home_url( '/wp-content/uploads/rsms-static/images/headd.svg' );

	foreach ( rsms_el_element_children( $el ) as $child ) {
		if ( 'img' === strtolower( $child->tagName ) ) {
			$src = $child->getAttribute( 'src' );
			if ( $src ) {
				$icon = rsms_el_abs_url( $src );
			}
		}
		if ( rsms_el_has_class( $child, 'detailCardContent' ) ) {
			foreach ( rsms_el_element_children( $child ) as $inner ) {
				$tag = strtolower( $inner->tagName );
				if ( 'h3' === $tag || 'h2' === $tag || 'h4' === $tag ) {
					$title = trim( $inner->textContent );
				} elseif ( 'p' === $tag ) {
					$desc = trim( $inner->textContent );
				}
			}
		}
	}

	if ( '' === $title && '' === $desc ) {
		return null;
	}

	return rsms_el_widget_image_box(
		$title,
		$desc,
		$icon,
		array(
			'_css_classes' => 'detailCard1 rsms-el-detail-card',
			'position'     => 'left',
			'title_size'   => 'h3',
			'image_alt'    => '',
		)
	);
}

/**
 * Program-style list-item card (image + title + data + optional tag/link).
 *
 * @param DOMElement $el list-item with list-item__image.
 * @return array<string, mixed>|null
 */
function rsms_el_convert_card_list_item( DOMElement $el ): ?array {
	$img_src = '';
	$title   = '';
	$data    = '';
	$tags    = array();
	$href    = ( 'a' === strtolower( $el->tagName ) ) ? $el->getAttribute( 'href' ) : '';

	// Prefer photo inside .list-item__image (skip yellowdot icons in tags).
	foreach ( rsms_el_element_children( $el ) as $child ) {
		if ( rsms_el_has_class( $child, 'list-item__image' ) ) {
			foreach ( $child->getElementsByTagName( 'img' ) as $img ) {
				if ( $img instanceof DOMElement ) {
					$img_src = $img->getAttribute( 'src' );
					break 2;
				}
			}
		}
	}
	if ( '' === $img_src ) {
		foreach ( $el->getElementsByTagName( 'img' ) as $img ) {
			if ( ! ( $img instanceof DOMElement ) ) {
				continue;
			}
			$src = $img->getAttribute( 'src' );
			if ( false !== strpos( $src, 'yellowdot' ) || false !== strpos( $src, 'headd.svg' ) ) {
				continue;
			}
			$img_src = $src;
			break;
		}
	}

	foreach ( $el->getElementsByTagName( '*' ) as $child ) {
		if ( ! ( $child instanceof DOMElement ) ) {
			continue;
		}
		if ( rsms_el_has_class( $child, 'list-item__title' ) ) {
			$title = trim( $child->textContent );
		} elseif ( rsms_el_has_class( $child, 'list-item__data' ) ) {
			$data = trim( $child->textContent );
		} elseif ( rsms_el_has_class( $child, 'list-item__tag' ) ) {
			$t = trim( $child->textContent );
			if ( '' !== $t ) {
				$tags[] = $t;
			}
		}
	}

	if ( '' === $title && '' === $data && ! $img_src && ! $tags ) {
		return null;
	}

	$parts = array();
	if ( '' !== $data ) {
		$parts[] = '<span class="rsms-el-card-data">' . esc_html( $data ) . '</span>';
	}
	foreach ( $tags as $t ) {
		// Block-level tag rows mirror Next `.list-item__tag.tags` (no `<br/>` separators).
		$parts[] = '<span class="rsms-el-card-tag tags">' . esc_html( $t ) . '</span>';
	}
	$desc = implode( '', $parts );

	$classes = array( 'rsms-el-card-list-item' );
	foreach ( rsms_el_class_list( $el ) as $c ) {
		if ( in_array( $c, array( 'left', 'right', 'main', 'list-item' ), true ) ) {
			$classes[] = $c;
		}
	}

	$position = 'top';
	if ( in_array( 'left', $classes, true ) ) {
		$position = 'left';
	} elseif ( in_array( 'right', $classes, true ) ) {
		$position = 'right';
	}

	$extra = array(
		'_css_classes' => implode( ' ', array_unique( $classes ) ),
		'title_size'   => 'h3',
		'position'     => $position,
	);

	if ( $href ) {
		$extra['link'] = array(
			'url'         => rsms_el_abs_url( $href ),
			'is_external' => '',
			'nofollow'    => '',
		);
	}

	if ( ! $img_src ) {
		$img_src = home_url( '/wp-content/uploads/rsms-static/images/headd.svg' );
	}

	return rsms_el_widget_image_box( '' !== $title ? $title : '', $desc, $img_src, $extra );
}

/**
 * @param DOMElement $el a.staff-container.
 * @return list<array<string, mixed>>
 */
function rsms_el_convert_staff_container( DOMElement $el ): array {
	$href     = $el->getAttribute( 'href' );
	$name     = '';
	$position = '';
	$img_src  = '';
	$img_alt  = '';

	foreach ( $el->getElementsByTagName( 'img' ) as $img ) {
		if ( $img instanceof DOMElement ) {
			$img_src = $img->getAttribute( 'src' );
			$img_alt = $img->getAttribute( 'alt' );
			break;
		}
	}
	foreach ( $el->getElementsByTagName( 'h3' ) as $h ) {
		if ( $h instanceof DOMElement ) {
			$name = trim( $h->textContent );
			break;
		}
	}
	foreach ( $el->getElementsByTagName( 'p' ) as $p ) {
		if ( $p instanceof DOMElement ) {
			$position = trim( $p->textContent );
			break;
		}
	}

	$link = array();
	if ( $href ) {
		$link = array(
			'url'         => rsms_el_abs_url( $href ),
			'is_external' => '',
			'nofollow'    => '',
		);
	}

	if ( ! $img_src ) {
		$img_src = home_url( '/wp-content/uploads/rsms-static/images/headd.svg' );
	}

	$extra = array(
		'_css_classes' => 'rsms-el-staff staff-container',
		'position'     => 'top',
		'title_size'   => 'h3',
		'image_alt'    => $img_alt ? $img_alt : $name,
	);
	if ( $link ) {
		$extra['link'] = $link;
	}

	return array(
		rsms_el_widget_image_box( $name, $position, $img_src, $extra ),
	);
}

/**
 * Whether a node looks convertible without falling back to a big HTML blob.
 *
 * @param DOMElement $el Element.
 */
function rsms_el_node_is_convertible( DOMElement $el ): bool {
	$tag = strtolower( $el->tagName );

	if ( in_array( $tag, array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'br', 'iframe', 'hr' ), true ) ) {
		return true;
	}

	if ( 'a' === $tag && rsms_el_is_simple_list_item( $el ) ) {
		return true;
	}
	if ( 'a' === $tag && rsms_el_has_class( $el, 'contact-number' ) ) {
		return true;
	}
	if ( 'a' === $tag && rsms_el_has_class( $el, 'staff-container' ) ) {
		return true;
	}
	if ( 'div' === $tag && rsms_el_has_class( $el, 'detailCard1' ) ) {
		return true;
	}
	if ( 'div' === $tag && ( rsms_el_has_class( $el, 'about-list' ) || rsms_el_has_class( $el, 'EPA-list' ) || rsms_el_has_class( $el, 'titleEPA' ) ) ) {
		return true;
	}
	if ( 'div' === $tag && rsms_el_has_class( $el, 'gallery-image' ) ) {
		return true;
	}
	if ( 'div' === $tag && rsms_el_has_class( $el, 'gallery-image-container' ) ) {
		return true;
	}
	if ( ( 'div' === $tag || 'a' === $tag ) && rsms_el_has_class( $el, 'list-item' ) ) {
		return true;
	}

	// Prefer unwrapping structural containers rather than HTML blobs.
	if ( in_array( $tag, array( 'div', 'span', 'section', 'article', 'main', 'ul', 'li', 'b', 'strong', 'em' ), true ) ) {
		return true;
	}

	return false;
}

/**
 * @param DOMElement $el Element to convert.
 * @return list<array<string, mixed>>
 */
function rsms_el_convert_element( DOMElement $el ): array {
	$tag = strtolower( $el->tagName );

	if ( 'br' === $tag ) {
		return array();
	}

	// Complex layout bands keep their CSS hooks but use native Elementor sections.
	if ( rsms_el_is_native_layout_band( $el ) ) {
		return array( rsms_el_convert_band_to_section( $el ) );
	}

	if ( preg_match( '/^h([1-6])$/', $tag, $hm ) ) {
		$inner = trim( rsms_el_inner_html( $el ) );
		// Elementor Heading escapes HTML — use Text Editor when markup (e.g. <b>) is needed.
		if ( '' !== $inner && preg_match( '/<[^>]+>/', $inner ) ) {
			return array(
				rsms_el_widget_text(
					'<' . $tag . '>' . $inner . '</' . $tag . '>'
				),
			);
		}
		$title = '' !== $inner ? wp_strip_all_tags( $inner ) : trim( $el->textContent );
		return array( rsms_el_widget_heading( $title, $tag ) );
	}

	if ( 'p' === $tag ) {
		$inner = rsms_el_inner_html( $el );
		$extra = array();
		$cls   = trim( $el->getAttribute( 'class' ) );
		if ( '' !== $cls ) {
			$extra['_css_classes'] = $cls;
			return array( rsms_el_widget_text( '<p class="' . esc_attr( $cls ) . '">' . $inner . '</p>', $extra ) );
		}
		return array( rsms_el_widget_text( '<p>' . $inner . '</p>' ) );
	}

	if ( 'img' === $tag ) {
		return array(
			rsms_el_widget_image(
				$el->getAttribute( 'src' ),
				$el->getAttribute( 'alt' ),
				array(
					'_css_classes' => trim( $el->getAttribute( 'class' ) ),
				)
			),
		);
	}

	if ( 'iframe' === $tag ) {
		$src = $el->getAttribute( 'src' );
		$cls = trim( $el->getAttribute( 'class' ) );
		if ( false !== strpos( $src, 'youtube.com' ) || false !== strpos( $src, 'youtu.be' ) ) {
			return array(
				rsms_el_widget_video(
					rsms_el_youtube_watch_url( $src ),
					array( '_css_classes' => $cls ? $cls : 'homelessness-video' )
				),
			);
		}
		if ( false !== stripos( $src, '.pdf' ) ) {
			$title = trim( $el->getAttribute( 'title' ) );
			$text  = '';
			$parent = $el->parentNode;
			if ( $parent instanceof DOMElement ) {
				foreach ( $parent->getElementsByTagName( 'div' ) as $div ) {
					if ( $div instanceof DOMElement && rsms_el_has_class( $div, 'rsms-pdf-a11y' ) ) {
						$text = trim( $div->textContent );
						break;
					}
				}
			}
			return array( rsms_el_widget_pdf( $src, $title ? $title : 'PDF preview', $text ) );
		}
		// Unknown third-party embeds remain explicit and isolated.
		return array( rsms_el_widget_html( rsms_el_html_abs( rsms_el_outer_html( $el ) ) ) );
	}

	// The PDF widget owns the extracted accessibility fallback text.
	if ( 'div' === $tag && rsms_el_has_class( $el, 'rsms-pdf-a11y' ) ) {
		return array();
	}

	if ( 'hr' === $tag ) {
		return array( rsms_el_widget_divider() );
	}

	if ( 'a' === $tag && rsms_el_has_class( $el, 'contact-number' ) ) {
		$text = trim( $el->textContent );
		$href = $el->getAttribute( 'href' );
		if ( '' === $text ) {
			$text = $href;
		}
		return array(
			rsms_el_widget_button(
				$text,
				$href,
				array( '_css_classes' => 'contact-number rsms-el-contact-number' )
			),
		);
	}

	// CTA anchors used on home / contact / gallery strips (class-gated only —
	// never convert arbitrary <a> tags; that broke enrollment .cardYellow cards).
	if ( 'a' === $tag ) {
		foreach ( array( 'yellowLink', 'visitgallery', 'fill-form-button', 'direction-button', 'cloudItem3' ) as $cta ) {
			if ( rsms_el_has_class( $el, $cta ) ) {
				$text = trim( preg_replace( '/\s+/', ' ', $el->textContent ) );
				$href = $el->getAttribute( 'href' );
				return array(
					rsms_el_widget_button(
						$text,
						$href,
						array( '_css_classes' => $cta )
					),
				);
			}
		}
	}

	if ( 'a' === $tag && $el->parentNode instanceof DOMElement && rsms_el_has_class( $el->parentNode, 'cardYellow' ) ) {
		return array(
			rsms_el_widget_button(
				trim( preg_replace( '/\s+/', ' ', $el->textContent ) ),
				$el->getAttribute( 'href' ),
				array( '_css_classes' => 'rsms-el-card-yellow-cta' )
			),
		);
	}

	if ( 'a' === $tag && rsms_el_has_class( $el, 'staff-container' ) ) {
		return rsms_el_convert_staff_container( $el );
	}

	if ( 'a' === $tag && rsms_el_is_simple_list_item( $el ) ) {
		return array( rsms_el_widget_icon_list( array( rsms_el_parse_simple_list_item( $el ) ) ) );
	}

	// Any other anchor — keep markup (do not unwrap; breaks cards/CTAs).
	if ( 'a' === $tag ) {
		return array( rsms_el_widget_html( rsms_el_html_abs( rsms_el_outer_html( $el ) ) ) );
	}

	if ( 'div' === $tag && rsms_el_has_class( $el, 'detailCard1' ) ) {
		$card = rsms_el_convert_detail_card( $el );
		if ( $card ) {
			return array( $card );
		}
		return array( rsms_el_widget_html( rsms_el_outer_html( $el ) ) );
	}

	if ( 'div' === $tag && rsms_el_has_class( $el, 'cloudItem' ) ) {
		return rsms_el_convert_cloud_item( $el );
	}

	if ( 'div' === $tag && rsms_el_has_class( $el, 'clouds' ) ) {
		$col_widgets = array();
		$col_classes = array();
		foreach ( rsms_el_element_children( $el ) as $item ) {
			if ( ! rsms_el_has_class( $item, 'cloudItem' ) ) {
				continue;
			}
			$col_widgets[] = rsms_el_convert_cloud_item( $item );
			$col_classes[] = 'cloudItem';
		}
		if ( $col_widgets ) {
			return array( rsms_el_pack_multi_column_section( $col_widgets, 'clouds', $col_classes ) );
		}
	}

	if ( 'div' === $tag && rsms_el_has_class( $el, 'metric-container' ) ) {
		return rsms_el_convert_metric_container( $el );
	}

	if ( 'div' === $tag && rsms_el_has_class( $el, 'metricsListContainer' ) ) {
		$columns = array();
		$col_cls = array();
		foreach ( rsms_el_element_children( $el ) as $child ) {
			if ( rsms_el_has_class( $child, 'metric-container' ) ) {
				$columns[] = rsms_el_convert_metric_container( $child );
				$col_cls[] = 'metric-container';
			}
		}
		if ( $columns ) {
			return array( rsms_el_pack_multi_column_section( $columns, trim( $el->getAttribute( 'class' ) ), $col_cls ) );
		}
	}

	// Editable multi-column grids (enrollment cards and program feature cards).
	if ( 'div' === $tag && rsms_el_has_class( $el, 'grid3x' ) ) {
		$columns = array();
		$classes = array();
		foreach ( rsms_el_element_children( $el ) as $child ) {
			// Convert the grid item itself, not only its children. ImageText
			// `.list-item.main` cards must become one editable Image Box just as
			// they do inside wave bands; flattening produced inconsistent title
			// alignment, image sizing, and spacing on elective grids.
			$columns[] = rsms_el_convert_element( $child );
			$classes[] = trim( $child->getAttribute( 'class' ) );
		}
		if ( $columns ) {
			return array( rsms_el_pack_multi_column_section( $columns, 'grid3x', $classes ) );
		}
	}

	// Subheading used on charter petition (Title Nine Information).
	if ( 'div' === $tag && rsms_el_has_class( $el, 'titleEPA' ) ) {
		$text = trim( $el->textContent );
		if ( '' === $text ) {
			return array();
		}
		return array(
			rsms_el_widget_heading(
				$text,
				'h3',
				array( '_css_classes' => 'titleEPA' )
			),
		);
	}

	// PDF / doc link wrappers — unwrap so a.list-item become Icon List widgets.
	if ( 'div' === $tag && ( rsms_el_has_class( $el, 'about-list' ) || rsms_el_has_class( $el, 'EPA-list' ) ) ) {
		$widgets    = rsms_el_convert_children( $el );
		$parent_cls = trim( $el->getAttribute( 'class' ) );
		foreach ( $widgets as &$w ) {
			if ( ( $w['widgetType'] ?? '' ) !== 'icon-list' ) {
				continue;
			}
			$cls                            = trim( ( $w['settings']['_css_classes'] ?? 'rsms-el-list-item' ) . ' ' . $parent_cls );
			$w['settings']['_css_classes'] = $cls;
		}
		unset( $w );
		return $widgets;
	}

	if ( 'div' === $tag && ( rsms_el_has_class( $el, 'gallery-image' ) || rsms_el_has_class( $el, 'gallery-image-container' ) ) ) {
		$widgets = array();
		foreach ( $el->getElementsByTagName( 'img' ) as $img ) {
			if ( $img instanceof DOMElement ) {
				$widgets[] = rsms_el_widget_image(
					$img->getAttribute( 'src' ),
					$img->getAttribute( 'alt' ),
					array( '_css_classes' => 'gallery-image gallery-image-container' )
				);
			}
		}
		return $widgets;
	}

	// Home gallery strip tiles.
	if ( 'div' === $tag && rsms_el_has_class( $el, 'image-item' ) ) {
		$widgets = array();
		foreach ( $el->getElementsByTagName( 'img' ) as $img ) {
			if ( $img instanceof DOMElement ) {
				$widgets[] = rsms_el_widget_image(
					$img->getAttribute( 'src' ),
					$img->getAttribute( 'alt' ),
					array( '_css_classes' => 'image-item' )
				);
			}
		}
		if ( $widgets ) {
			return $widgets;
		}
	}

	// Tag pills / bullet rows used on program pages (img + span text).
	if ( 'div' === $tag && rsms_el_has_class( $el, 'list-item__tag' ) ) {
		$text = trim( $el->textContent );
		if ( '' !== $text ) {
			return array(
				rsms_el_widget_icon_list(
					array(
						array(
							'text'     => $text,
							'url'      => '',
							'external' => false,
						),
					),
					array( '_css_classes' => 'rsms-el-list-item rsms-el-tag' )
				),
			);
		}
	}

	// Complex program list-item cards (image + title + data) → image-box.
	if ( ( 'div' === $tag || 'a' === $tag ) && rsms_el_has_class( $el, 'list-item' ) && ! rsms_el_is_simple_list_item( $el ) ) {
		$card = rsms_el_convert_card_list_item( $el );
		if ( $card ) {
			return array( $card );
		}
	}

	// Style bands that need their own Elementor section (editable widgets + CSS hooks).
	if ( 'div' === $tag && rsms_el_is_style_section_wrapper( $el ) ) {
		return array( rsms_el_convert_style_section_wrapper( $el ) );
	}

	// Structural wrappers — always unwrap children (keeps pages native-editable).
	if ( in_array( $tag, array( 'div', 'span', 'section', 'article', 'main', 'ul', 'li', 'b', 'strong', 'em' ), true ) ) {
		$children = rsms_el_element_children( $el );
		if ( ! $children ) {
			$text = trim( $el->textContent );
			if ( '' !== $text ) {
				// Leaf text in span/li/b/etc.
				if ( 'li' === $tag ) {
					return array(
						rsms_el_widget_icon_list(
							array(
								array(
									'text'     => $text,
									'url'      => '',
									'external' => false,
								),
							)
						),
					);
				}
				$cls = trim( $el->getAttribute( 'class' ) );
				return array(
					rsms_el_widget_text(
						'<p>' . rsms_el_inner_html( $el ) . '</p>',
						$cls ? array( '_css_classes' => $cls ) : array()
					),
				);
			}
			return array();
		}
		// Group consecutive <li> into one icon-list.
		if ( 'ul' === $tag ) {
			$items = array();
			foreach ( $children as $li ) {
				if ( 'li' !== strtolower( $li->tagName ) ) {
					continue;
				}
				$items[] = array(
					'text'     => trim( $li->textContent ),
					'url'      => '',
					'external' => false,
				);
			}
			if ( $items ) {
				return array( rsms_el_widget_icon_list( $items, array( '_css_classes' => 'rsms-el-list-item rsms-el-ul' ) ) );
			}
		}
		return rsms_el_convert_children( $el );
	}

	// Unknown element — try children, else small HTML chunk.
	$children = rsms_el_element_children( $el );
	if ( $children ) {
		return rsms_el_convert_children( $el );
	}

	return array( rsms_el_widget_html( rsms_el_outer_html( $el ) ) );
}

/**
 * Convert child nodes, grouping consecutive simple list-items.
 *
 * @param DOMNode $parent Parent node.
 * @return list<array<string, mixed>>
 */
function rsms_el_convert_children( DOMNode $parent ): array {
	$widgets = array();
	$nodes   = array();
	foreach ( $parent->childNodes as $child ) {
		$nodes[] = $child;
	}

	$count = count( $nodes );
	for ( $i = 0; $i < $count; $i++ ) {
		$node = $nodes[ $i ];

		if ( XML_TEXT_NODE === $node->nodeType || XML_CDATA_SECTION_NODE === $node->nodeType ) {
			if ( '' === trim( $node->textContent ) ) {
				continue;
			}
			// Stray text → text-editor.
			$widgets[] = rsms_el_widget_text( '<p>' . htmlspecialchars( trim( $node->textContent ), ENT_QUOTES, 'UTF-8' ) . '</p>' );
			continue;
		}

		if ( ! ( $node instanceof DOMElement ) ) {
			continue;
		}

		if ( 'br' === strtolower( $node->tagName ) ) {
			continue;
		}

		if ( rsms_el_is_simple_list_item( $node ) ) {
			$items = array( rsms_el_parse_simple_list_item( $node ) );
			while ( $i + 1 < $count ) {
				$next = $nodes[ $i + 1 ];
				if ( $next instanceof DOMElement && rsms_el_is_simple_list_item( $next ) ) {
					$items[] = rsms_el_parse_simple_list_item( $next );
					++$i;
					continue;
				}
				if ( XML_TEXT_NODE === $next->nodeType && '' === trim( $next->textContent ) ) {
					++$i;
					continue;
				}
				break;
			}
			$extra         = array( '_css_classes' => 'rsms-el-list-item' );
			$has_noborder  = false;
			$batch_start   = $i - count( $items ) + 1;
			for ( $j = $batch_start; $j <= $i; $j++ ) {
				if ( $j < 0 || ! isset( $nodes[ $j ] ) || ! ( $nodes[ $j ] instanceof DOMElement ) ) {
					continue;
				}
				if ( rsms_el_has_class( $nodes[ $j ], 'nobborder' ) ) {
					$has_noborder = true;
					break;
				}
			}
			if ( $has_noborder && 1 === count( $items ) ) {
				$extra['_css_classes'] = 'rsms-el-list-item nobborder';
			}
			$widgets[] = rsms_el_widget_icon_list( $items, $extra );
			continue;
		}

		foreach ( rsms_el_convert_element( $node ) as $w ) {
			$widgets[] = $w;
		}
	}

	return $widgets;
}

/**
 * Resolve interior page hero title/subtitle from page-heroes.json / staff.
 *
 * @param string $path Page path without leading slash (e.g. about, about/meet-our-staff/foo).
 * @return array{header:string,subHeader:string}|null Null for home (carousel stays in theme).
 */
function rsms_el_resolve_hero( string $path ): ?array {
	if ( 'home' === $path ) {
		return null;
	}

	$uri         = '/' . ltrim( $path, '/' );
	$heroes_file = ABSPATH . 'wp-content/rsms-bin/page-heroes.json';
	$heroes      = array();
	if ( file_exists( $heroes_file ) ) {
		$decoded = json_decode( (string) file_get_contents( $heroes_file ), true );
		if ( is_array( $decoded ) ) {
			$heroes = $decoded;
		}
	}

	if ( preg_match( '#^/about/meet-our-staff/([^/]+)$#', $uri, $m ) ) {
		$slug       = $m[1];
		$staff_file = ABSPATH . 'wp-content/rsms-bin/staff-full.json';
		$name       = ucwords( str_replace( '-', ' ', $slug ) );
		$position   = '';
		if ( file_exists( $staff_file ) ) {
			$list = json_decode( (string) file_get_contents( $staff_file ), true );
			if ( is_array( $list ) ) {
				foreach ( $list as $row ) {
					if ( ( $row['slug'] ?? '' ) === $slug ) {
						$name     = $row['name'] ?? $name;
						$position = $row['position'] ?? '';
						break;
					}
				}
			}
		}
		return array(
			'header'    => $position ? sprintf( '%s (%s)', $name, $position ) : $name,
			'subHeader' => '',
		);
	}

	if ( isset( $heroes[ $uri ] ) && is_array( $heroes[ $uri ] ) ) {
		return array(
			'header'    => (string) ( $heroes[ $uri ]['header'] ?? '' ),
			'subHeader' => (string) ( $heroes[ $uri ]['subHeader'] ?? '' ),
		);
	}

	$page = get_page_by_path( $path, OBJECT, 'page' );
	return array(
		'header'    => $page ? (string) $page->post_title : ucwords( str_replace( '-', ' ', basename( $path ) ) ),
		'subHeader' => '',
	);
}

/**
 * Editable green hero band (replaces theme PHP .header_main__content title).
 *
 * @param array{header:string,subHeader:string} $hero Hero copy.
 * @return array<string, mixed>
 */
function rsms_el_build_hero_section( array $hero ): array {
	$title = (string) ( $hero['header'] ?? '' );
	$sub   = (string) ( $hero['subHeader'] ?? '' );

	$widgets = array(
		rsms_el_widget_heading(
			$title,
			'h2',
			array(
				'_css_classes' => 'rsms-el-hero-title',
			)
		),
		rsms_el_widget_text(
			'<p>' . esc_html( $sub ) . '</p>',
			array(
				'_css_classes' => 'rsms-el-hero-subtitle',
			)
		),
	);

	return array(
		'id'       => rsms_el_nid(),
		'elType'   => 'section',
		'isInner'  => false,
		'settings' => array(
			'layout'        => 'full_width',
			'content_width' => array(
				'unit' => 'rem',
				'size' => 71.25,
			),
			'gap'           => 'no',
			'css_classes'   => 'rsms-el-hero container',
			// Padding via CSS only (4.75rem) — avoid Elementor px stacking with rem.
			'padding'       => array(
				'unit'     => 'px',
				'top'      => '0',
				'right'    => '0',
				'bottom'   => '0',
				'left'     => '0',
				'isLinked' => true,
			),
			'margin'        => array(
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
	);
}

/**
 * Build Elementor document from page HTML.
 *
 * @param string $html Content HTML.
 * @return array<int, array<string, mixed>>
 */
function rsms_el_build_native_document( string $html ): array {
	$dom = new DOMDocument();
	libxml_use_internal_errors( true );
	$wrapped = '<?xml encoding="utf-8"><html><body>' . $html . '</body></html>';
	$dom->loadHTML( $wrapped );
	libxml_clear_errors();

	$body = $dom->getElementsByTagName( 'body' )->item( 0 );
	if ( ! $body ) {
		return array();
	}

	$root = null;
	foreach ( $body->childNodes as $child ) {
		if ( $child instanceof DOMElement ) {
			$root = $child;
			break;
		}
	}
	if ( ! $root ) {
		return array();
	}

	if ( rsms_el_has_class( $root, 'home' ) ) {
		return rsms_el_build_native_home_document( $root );
	}

	// Entire page is one complex layout (gallery / metrics) — keep as HTML.
	if ( rsms_el_is_layout_html_block( $root ) ) {
		return array( rsms_el_build_html_block_section( $root ) );
	}

	$section_classes = rsms_el_class_list( $root );
	$padding_top     = rsms_el_style_px( $root->getAttribute( 'style' ), 'padding-top' );
	$convert_from    = $root;

	// Hoist single .container child so section gets container + page classes.
	$kids = rsms_el_element_children( $root );
	if ( 1 === count( $kids ) && rsms_el_has_class( $kids[0], 'container' ) && ! rsms_el_is_layout_html_block( $kids[0] ) ) {
		$section_classes = array_values( array_unique( array_merge( $section_classes, rsms_el_class_list( $kids[0] ) ) ) );
		$child_pad       = rsms_el_style_px( $kids[0]->getAttribute( 'style' ), 'padding-top' );
		if ( null === $padding_top && null !== $child_pad ) {
			$padding_top = $child_pad;
		}
		$convert_from = $kids[0];
	} elseif ( count( $kids ) >= 1 ) {
		foreach ( $kids as $kid ) {
			if ( rsms_el_has_class( $kid, 'container' ) && ! in_array( 'container', $section_classes, true ) ) {
				$section_classes[] = 'container';
				break;
			}
		}
	}

	if ( null === $padding_top ) {
		$margin_top = rsms_el_style_px( $root->getAttribute( 'style' ), 'margin-top' );
		if ( null !== $margin_top ) {
			$padding_top = $margin_top;
		}
	}

	$page_css = trim( implode( ' ', $section_classes ) );
	$layout   = in_array( 'container', $section_classes, true ) ? 'boxed' : 'full_width';

	$sections = array();
	$buffer   = array();

	$flush_buffer = function () use ( &$buffer, &$sections, $page_css, $layout, &$padding_top ) {
		if ( ! $buffer ) {
			return;
		}
		// Split: if buffer items are already sections, push them; else pack widgets.
		$widgets = array();
		foreach ( $buffer as $item ) {
			// Promote only top-level sections (HTML blocks). Inner style bands
			// (tk-header, tkDetail, …) nest inside the page section so CSS hooks
			// and page classes like .tkMain still apply.
			$is_top_section = isset( $item['elType'] ) && 'section' === $item['elType'] && empty( $item['isInner'] );
			if ( $is_top_section ) {
				if ( $widgets ) {
					$opts = array( 'layout' => $layout );
					$sec  = rsms_el_pack_section( $widgets, $page_css, $opts );
					if ( null !== $padding_top ) {
						$sec['settings']['padding'] = array(
							'unit'     => 'px',
							'top'      => (string) $padding_top,
							'right'    => '0',
							'bottom'   => '0',
							'left'     => '0',
							'isLinked' => false,
						);
						$padding_top = null; // only first content section.
					}
					$sections[] = $sec;
					$widgets    = array();
				}
				$sections[] = $item;
			} else {
				$widgets[] = $item;
			}
		}
		if ( $widgets ) {
			$sec = rsms_el_pack_section( $widgets, $page_css, array( 'layout' => $layout ) );
			if ( null !== $padding_top ) {
				$sec['settings']['padding'] = array(
					'unit'     => 'px',
					'top'      => (string) $padding_top,
					'right'    => '0',
					'bottom'   => '0',
					'left'     => '0',
					'isLinked' => false,
				);
				$padding_top = null;
			}
			$sections[] = $sec;
		}
		$buffer = array();
	};

	$source_group_index = 0;
	foreach ( rsms_el_element_children( $convert_from ) as $child ) {
		if ( rsms_el_is_layout_html_block( $child ) ) {
			$flush_buffer();
			// Keep page wrapper classes on the HTML section so nested CSS matches
			// (e.g. .lowerElementry .home-section-2, .home .home-section-1).
			$sections[] = rsms_el_build_html_block_section( $child, $page_css );
			++$source_group_index;
			continue;
		}
		$pieces = rsms_el_convert_element( $child );
		if ( $source_group_index > 0 && $pieces ) {
			$first_settings_key = ( isset( $pieces[0]['elType'] ) && 'widget' === $pieces[0]['elType'] )
				? '_css_classes'
				: 'css_classes';
			$pieces[0]['settings'][ $first_settings_key ] = trim(
				( $pieces[0]['settings'][ $first_settings_key ] ?? '' ) . ' rsms-el-source-group-start'
			);
		}
		foreach ( $pieces as $piece ) {
			if ( isset( $piece['elType'] ) && 'section' === $piece['elType'] && empty( $piece['isInner'] ) ) {
				$flush_buffer();
				// Native full-width bands carry their own inner `.container`. Copy the
				// page identity classes for styling, but never copy the root container
				// class onto the band itself or its background becomes width-capped.
				$band_page_css = trim(
					preg_replace( '/\s+/', ' ', (string) preg_replace( '/\bcontainer\b/', '', $page_css ) )
				);
				$piece['settings']['css_classes'] = trim(
					( $piece['settings']['css_classes'] ?? '' ) . ' ' . $band_page_css
				);
				$sections[] = $piece;
			} else {
				$buffer[] = $piece;
			}
		}
		if ( $pieces ) {
			++$source_group_index;
		}
	}
	$flush_buffer();

	return $sections ? $sections : array();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

$files = glob( $content_dir . '/*.html' );
if ( ! $files ) {
	WP_CLI::error( 'No HTML files in content/' );
}

$ok   = 0;
$skip = 0;

foreach ( $files as $file ) {
	$stem = basename( $file, '.html' );
	if ( 0 === strpos( $stem, '_' ) ) {
		continue;
	}

	$path = rsms_el_stem_to_path( $stem );
	$page = get_page_by_path( $path, OBJECT, 'page' );
	if ( ! $page ) {
		WP_CLI::warning( "No WP page for {$path} (from {$stem}.html)" );
		++$skip;
		continue;
	}

	$html     = (string) file_get_contents( $file );
	$document = rsms_el_build_native_document( $html );
	$hero     = rsms_el_resolve_hero( $path );
	if ( null !== $hero && '' !== trim( (string) ( $hero['header'] ?? '' ) ) ) {
		array_unshift( $document, rsms_el_build_hero_section( $hero ) );
	}
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

	WP_CLI::success( "{$path} ← {$stem}.html (#{$page->ID})" );
	++$ok;
}

if ( class_exists( '\Elementor\Plugin' ) ) {
	try {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
		WP_CLI::log( 'Elementor CSS cache cleared.' );
	} catch ( Exception $e ) {
		WP_CLI::warning( $e->getMessage() );
	}
}

$html_chunks = (int) $GLOBALS['rsms_el_html_chunks'];
WP_CLI::success( "Converted {$ok} / skipped {$skip} / html-widget-chunks {$html_chunks}." );

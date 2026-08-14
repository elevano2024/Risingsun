<?php
/**
 * Editable PDF preview widget for Elementor Free.
 *
 * @package RSMS_Elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * PDF preview with editable URL and accessible title controls.
 */
class RSMS_Elementor_PDF_Widget extends \Elementor\Widget_Base {

	/**
	 * @return string
	 */
	public function get_name(): string {
		return 'rsms-pdf-preview';
	}

	/**
	 * @return string
	 */
	public function get_title(): string {
		return esc_html__( 'RSMS PDF Preview', 'rsms-elementor' );
	}

	/**
	 * @return string
	 */
	public function get_icon(): string {
		return 'eicon-document-file';
	}

	/**
	 * @return array<int, string>
	 */
	public function get_categories(): array {
		return array( 'general' );
	}

	/**
	 * Register editor controls.
	 */
	protected function register_controls(): void {
		$this->start_controls_section(
			'content_section',
			array( 'label' => esc_html__( 'PDF', 'rsms-elementor' ) )
		);

		$this->add_control(
			'pdf_url',
			array(
				'label'       => esc_html__( 'PDF URL', 'rsms-elementor' ),
				'type'        => \Elementor\Controls_Manager::URL,
				'placeholder' => esc_url( home_url( '/wp-content/uploads/document.pdf' ) ),
				'dynamic'     => array( 'active' => true ),
			)
		);

		$this->add_control(
			'pdf_title',
			array(
				'label'       => esc_html__( 'Accessible title', 'rsms-elementor' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'default'     => esc_html__( 'PDF preview', 'rsms-elementor' ),
				'label_block' => true,
			)
		);

		$this->add_control(
			'fallback_text',
			array(
				'label'       => esc_html__( 'Screen-reader fallback text', 'rsms-elementor' ),
				'type'        => \Elementor\Controls_Manager::TEXTAREA,
				'description' => esc_html__( 'Optional. PDF.js replaces this with extracted first-page text when available.', 'rsms-elementor' ),
				'rows'        => 5,
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Render the frontend widget.
	 */
	protected function render(): void {
		$settings = $this->get_settings_for_display();
		$url      = (string) ( $settings['pdf_url']['url'] ?? '' );
		$title    = trim( (string) ( $settings['pdf_title'] ?? '' ) );
		$text     = trim( (string) ( $settings['fallback_text'] ?? '' ) );

		if ( '' === $url ) {
			if ( \Elementor\Plugin::$instance->editor->is_edit_mode() ) {
				echo '<p>' . esc_html__( 'Choose a PDF URL in the widget settings.', 'rsms-elementor' ) . '</p>';
			}
			return;
		}
		?>
		<div
			class="rsms-pdf-widget"
			data-rsms-pdf-src="<?php echo esc_url( $url ); ?>"
			data-rsms-pdf-title="<?php echo esc_attr( $title ? $title : 'PDF preview' ); ?>"
		>
			<div class="rsms-pdf-preview">
				<div class="rsms-pdf-a11y"><?php echo esc_html( $text ); ?></div>
			</div>
		</div>
		<?php
	}
}

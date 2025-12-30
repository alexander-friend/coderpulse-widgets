( function( blocks, element, blockEditor, i18n ) {
	var el = element.createElement;
	var __ = i18n.__;

	// Cron Builder Block
	blocks.registerBlockType( 'coderpulse/cron-builder', {
		title: __( 'Cron Builder (CoderPulse)', 'coderpulse-widgets' ),
		icon: 'calendar-alt',
		category: 'coderpulse',
		attributes: {},
		edit: function( props ) {
			return el( 'div', { className: 'cp-block-editor-wrap' },
				el( 'strong', {}, __( 'Cron Builder Widget', 'coderpulse-widgets' ) ),
				el( 'p', {}, __( 'The cron builder allows users to easily generate cron expressions.', 'coderpulse-widgets' ) ),
				el( 'cp-cron-builder', {} )
			);
		},
		save: function( props ) {
			return el( 'cp-cron-builder', {} );
		}
	} );

} )( window.wp.blocks, window.wp.element, window.wp.blockEditor, window.wp.i18n );

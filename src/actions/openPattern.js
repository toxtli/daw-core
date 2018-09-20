"use strict";

DAW.prototype.openPattern = function( id ) {
	const cmp = this.cmp;

	if ( id !== cmp.patternOpened ) {
		const synId = cmp.patterns[ id ].synth,
			obj = { patternOpened: id };

		if ( synId !== cmp.synthOpened ) {
			obj.synthOpened = synId;
		}
		this.composition.change( obj );
	}
};

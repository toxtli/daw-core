"use strict";

DAW.prototype.openPattern = function( id ) {
	const cmp = this.cmp;

	if ( id !== cmp.patternOpened ) {
		const synId = cmp.patterns[ id ].synth,
			obj = { patternOpened: id };

		if ( synId !== cmp.synthOpened ) {
			this._call( "synthOpened", synId, cmp.synthOpened );
			obj.synthOpened = synId;
		}
		this._call( "patternOpened", id, cmp.patternOpened );
		this.composition.change( obj );
	}
};

"use strict";

DAW.prototype.openSynth = function( id ) {
	const cmp = this.cmp;

	if ( id !== cmp.synthOpened ) {
		const patId = this._openSynth_find( cmp, id ),
			obj = { synthOpened: id };

		if ( patId !== cmp.patternOpened ) {
			obj.patternOpened = patId;
		}
		this.composition.change( obj );
	}
};

DAW.prototype._openSynth_find = function( cmp, id ) {
	const pat = Object.entries( cmp.patterns )
			.find( ( [ patId, pat ] ) => pat.synth === id );

	return pat ? pat[ 0 ] : null;
};

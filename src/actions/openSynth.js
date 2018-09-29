"use strict";

DAW.prototype.openSynth = function( id ) {
	if ( id !== this.get.synthOpened() ) {
		const patId = this._openSynth_find( id ),
			obj = { synthOpened: id };

		if ( patId !== this.get.patternOpened() ) {
			obj.patternOpened = patId;
		}
		this.composition.change( obj, DAW.composeUndo( this.get.composition(), obj ) );
	}
};

DAW.prototype._openSynth_find = function( id ) {
	const pat = Object.entries( this.get.patterns() )
			.find( ( [ patId, pat ] ) => pat.synth === id );

	return pat ? pat[ 0 ] : null;
};

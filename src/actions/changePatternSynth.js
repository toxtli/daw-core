"use strict";

DAW.prototype.changePatternSynth = function( id, synth ) {
	const pat = this._getObjFromComposition( "patterns", id );

	if ( !pat ) {
		this._error( "changePatternSynth", "patterns", id );
	} else if ( pat.synth !== synth ) {
		this.history.stackChange( { patterns: { [ id ]: { synth } } } );
	}
};

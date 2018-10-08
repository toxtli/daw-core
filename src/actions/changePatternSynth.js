"use strict";

DAW.prototype.changePatternSynth = function( id, synth ) {
	const pat = this.get.pattern( id );

	if ( !pat ) {
		this._error( "changePatternSynth", "patterns", id );
	} else if ( pat.synth !== synth ) {
		this.compositionChange( { patterns: { [ id ]: { synth } } } );
	}
};

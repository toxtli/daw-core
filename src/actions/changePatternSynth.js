"use strict";

DAW.prototype.changePatternSynth = function( id, synth ) {
	const pat = this._getObjFromComposition( "patterns", id );

	!pat
		? this._error( "changePatternSynth", "patterns", id )
		: this.history.stackChange( { patterns: { [ id ]: { synth } } } );
};

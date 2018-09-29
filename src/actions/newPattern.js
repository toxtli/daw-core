"use strict";

DAW.prototype.newPattern = function( synthId ) {
	const syn = this.get.synth( synthId );

	!syn
		? this._error( "newPattern", "synths", synthId )
		: this.history.stackChange( this._newPattern( synthId ) );
};

DAW.prototype._newPattern = function( synthId ) {
	const keysId = this._getNextIdOf( this.get.keys() ),
		patId = this._getNextIdOf( this.get.patterns() );

	return {
		keys: { [ keysId ]: {} },
		patterns: { [ patId ]: {
			name: this._createUniqueName( "patterns", "pat" ),
			type: "keys",
			keys: keysId,
			synth: synthId,
			duration: this.get.beatsPerMeasure(),
		} },
		patternOpened: patId,
	};
};

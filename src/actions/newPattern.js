"use strict";

DAW.prototype.newPattern = function( synthId ) {
	const syn = this._getObjFromComposition( "synths", synthId );

	!syn
		? this._error( "newPattern", "synths", synthId )
		: this.history.stackChange( this._newPattern( synthId ) );
};

DAW.prototype._newPattern = function( synthId ) {
	const cmp = this.cmp,
		keysId = this._getMaxIdOf( cmp.keys ),
		patId = this._getMaxIdOf( cmp.patterns );

	return {
		keys: { [ keysId ]: {} },
		patterns: { [ patId ]: {
			name: this._createUniqueName( "patterns", "pat" ),
			type: "keys",
			keys: keysId,
			synth: synthId,
			duration: cmp.beatsPerMeasure,
		} }
	};
};

"use strict";

DAW.prototype.newPattern = function( synthId ) {
	const syn = this._getObjFromComposition( "synths", synthId );

	!syn
		? this._error( "newPattern", "synths", synthId )
		: this.history.stackChange( this.composition.change( this._newPattern( synthId ) ) );
};

DAW.prototype._newPattern = function( synthId ) {
	const keysId = this._getMaxIdOf( this._cmp.keys ),
		patId = this._getMaxIdOf( this._cmp.patterns );

	return {
		keys: { [ keysId ]: {} },
		patterns: { [ patId ]: {
			name: this._createUniqueName( "patterns", "pat" ),
			type: "keys",
			keys: keysId,
			synth: synthId,
			duration: this._cmp.beatsPerMeasure,
		} }
	};
};

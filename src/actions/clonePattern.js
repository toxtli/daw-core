"use strict";

DAW.prototype.clonePattern = function( id ) {
	const pat = this._getObjFromComposition( "patterns", id );

	!pat
		? this._error( "clonePattern", "patterns", id )
		: this.history.stackChange( this.composition.change(
			this._clonePattern( id, pat ) ) );
};

DAW.prototype._clonePattern = function( patId, pat ) {
	const cmp = this._cmp,
		newPat = Object.assign( {}, pat ),
		newKeys = DAW.deepAssign( {}, cmp.keys[ pat.keys ] ),
		newPatId = this._getMaxIdOf( cmp.patterns ),
		newKeysId = this._getMaxIdOf( cmp.keys );

	newPat.keys = newKeysId;
	newPat.name = this._createUniqueName( "patterns", pat.name );
	return {
		keys: { [ newKeysId ]: newKeys },
		patterns: { [ newPatId ]: newPat },
	};
};

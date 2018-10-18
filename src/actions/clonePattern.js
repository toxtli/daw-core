"use strict";

DAWCore.prototype.clonePattern = function( id ) {
	const pat = this.get.pattern( id );

	pat
		? this.compositionChange( this._clonePattern( id, pat ) )
		: this._error( "clonePattern", "patterns", id );
};

DAWCore.prototype._clonePattern = function( patId, pat ) {
	const newPat = Object.assign( {}, pat ),
		newKeys = DAWCore.objectDeepAssign( {}, this.get.keys( pat.keys ) ),
		newPatId = this._getNextIdOf( this.get.patterns() ),
		newKeysId = this._getNextIdOf( this.get.keys() );

	newPat.keys = newKeysId;
	newPat.name = this._createUniqueName( "patterns", pat.name );
	return {
		keys: { [ newKeysId ]: newKeys },
		patterns: { [ newPatId ]: newPat },
		patternOpened: newPatId,
	};
};

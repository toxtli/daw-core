"use strict";

DAWCore.prototype.namePattern = function( id, name ) {
	const pat = this.get.pattern( id );

	pat
		? this._namePattern( id, pat, name )
		: this._error( "namePattern", "patterns", id );
};

DAWCore.prototype._namePattern = function( id, pat, newName ) {
	const name = DAWCore.trim2( newName );

	if ( name && name !== pat.name ) {
		this.compositionChange( { patterns: { [ id ]: { name } } } );
	}
};

"use strict";

DAW.prototype.namePattern = function( id, name ) {
	const pat = this.get.pattern( id );

	pat
		? this._namePattern( id, pat, name )
		: this._error( "namePattern", "patterns", id );
};

DAW.prototype._namePattern = function( id, pat, newName ) {
	const name = DAW.trim2( newName );

	if ( name && name !== pat.name ) {
		this.compositionChange( { patterns: { [ id ]: { name } } } );
	}
};

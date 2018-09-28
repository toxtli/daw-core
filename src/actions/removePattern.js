"use strict";

DAW.prototype.removePattern = function( id ) {
	const pat = this._getObjFromComposition( "patterns", id );

	!pat
		? this._error( "removePattern", "patterns", id )
		: this.history.stackChange( this._removePattern( id, pat ) );
};

DAW.prototype._removePattern = function( patId, pat ) {
	const cmp = this.cmp,
		obj = {
			keys: { [ pat.keys ]: null },
			patterns: { [ patId ]: null },
		},
		blocks = Object.entries( cmp.blocks ).reduce( ( blocks, [ blcId, blc ] ) => {
			if ( blc.pattern === patId ) {
				blocks[ blcId ] = null;
			}
			return blocks;
		}, {} );

	if ( !DAW.objectIsEmpty( blocks ) ) {
		obj.blocks = blocks;
	}
	return obj;
};

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
			keys: { [ pat.keys ]: undefined },
			patterns: { [ patId ]: undefined },
		},
		blocks = Object.entries( cmp.blocks ).reduce( ( blocks, [ blcId, blc ] ) => {
			if ( blc.pattern === patId ) {
				blocks[ blcId ] = undefined;
			}
			return blocks;
		}, {} );

	if ( !DAW.objectIsEmpty( blocks ) ) {
		obj.blocks = blocks;
	}
	if ( patId === cmp.patternOpened ) {
		if ( !Object.entries( cmp.patterns ).some( ( [ k, v ] ) => {
			if ( k !== patId && v.synth === pat.synth ) {
				obj.patternOpened = k;
				return true;
			}
		} ) ) {
			obj.patternOpened = null;
		}
	}
	return obj;
};

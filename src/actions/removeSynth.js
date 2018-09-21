"use strict";

DAW.prototype.removeSynth = function( id ) {
	const syn = this._getObjFromComposition( "synths", id );

	!syn
		? this._error( "removeSynth", "synths", id )
		: this.history.stackChange( this.composition.change(
			this._removeSynth( id ) ) );
};

DAW.prototype._removeSynth = function( synthId ) {
	const cmp = this.cmp,
		keys = {},
		blocks = {},
		patterns = {},
		cmpBlocks = Object.entries( cmp.blocks ),
		obj = { synths: { [ synthId ]: undefined } };

	Object.entries( cmp.patterns ).forEach( ( [ patId, pat ] ) => {
		if ( pat.synth === synthId ) {
			keys[ pat.keys ] =
			patterns[ patId ] = undefined;
			cmpBlocks.forEach( ( [ blcId, blc ] ) => {
				if ( blc.pattern === patId ) {
					blocks[ blcId ] = undefined;
				}
			} );
		}
	} );
	if ( DAW.objectIsEmpty( keys ) ) {
		obj.keys = keys;
		obj.patterns = patterns;
		if ( DAW.objectIsEmpty( keys ) ) {
			obj.blocks = blocks;
		}
	}
	return obj;
};

"use strict";

DAW.prototype.removeSynth = function( id ) {
	const syn = this._getObjFromComposition( "synths", id );

	!syn
		? this._error( "removeSynth", "synths", id )
		: this.history.stackChange( this._removeSynth( id ) );
};

DAW.prototype._removeSynth = function( synthId ) {
	const cmp = this.cmp,
		keys = {},
		blocks = {},
		patterns = {},
		cmpBlocks = Object.entries( cmp.blocks ),
		cmpPatterns = Object.entries( cmp.patterns ),
		obj = { synths: { [ synthId ]: undefined } };

	cmpPatterns.forEach( ( [ patId, pat ] ) => {
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
	if ( !DAW.objectIsEmpty( keys ) ) {
		obj.keys = keys;
		obj.patterns = patterns;
		if ( !DAW.objectIsEmpty( blocks ) ) {
			obj.blocks = blocks;
		}
	}
	if ( synthId === cmp.synthOpened ) {
		if ( !Object.entries( cmp.synths ).some( ( [ k, v ] ) => {
			if ( k !== synthId ) {
				obj.synthOpened = k;
				if ( !cmpPatterns.some( ( [ patId, pat ] ) => {
					if ( pat.synth === k ) {
						obj.patternOpened = patId;
						return true;
					}
				} ) ) {
					obj.patternOpened = null;
				}
				return true;
			}
		} ) ) {
			obj.synthOpened = null;
		}
	}
	return obj;
};

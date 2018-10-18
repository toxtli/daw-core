"use strict";

DAWCore.prototype.openPattern = function( id ) {
	if ( id !== this.get.patternOpened() ) {
		const synId = this.get.pattern( id ).synth,
			obj = { patternOpened: id };

		if ( synId !== this.get.synthOpened() ) {
			obj.synthOpened = synId;
		}
		this.composition.change( obj, DAWCore.composeUndo( this.get.composition(), obj ) );
	}
};

"use strict";

DAWCore.prototype.addComposition = function( cmp ) {
	this.compositions.set( cmp.id, cmp );
	this._call( "compositionAdded", cmp );
	return Promise.resolve( cmp );
};

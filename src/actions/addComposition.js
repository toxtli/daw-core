"use strict";

DAW.prototype.addComposition = function( cmp ) {
	this.compositions.set( cmp.id, cmp );
	return Promise.resolve( cmp );
};

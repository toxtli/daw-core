"use strict";

DAWCore.prototype.deleteComposition = function( cmp ) {
	this.compositions.delete( cmp.id );
	this._call( "compositionDeleted", cmp );
};

"use strict";

DAWCore.prototype.deleteComposition = function( id ) {
	if ( id === this.get.id() ) {
		this.closeComposition();
	} else {
		this._deleteComposition( id );
	}
};

DAWCore.prototype._deleteComposition = function( id ) {
	const cmp = this.compositions.get( id );

	this.compositions.delete( id );
	this._call( "compositionDeleted", cmp );
};

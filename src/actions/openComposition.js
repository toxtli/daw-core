"use strict";

DAW.prototype.openComposition = function( id ) {
	const cmp = this.compositions.get( id );

	if ( cmp ) {
		this.cmp = cmp;
		this._call( "compositionLoading", cmp );
		this.composition.load( cmp );
		this._call( "compositionLoaded", cmp );
	}
};

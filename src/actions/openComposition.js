"use strict";

DAW.prototype.openComposition = function( id ) {
	const cmp = this.compositions.get( id );

	if ( cmp ) {
		this.cmp = cmp;
		this.call( "compositionLoading", cmp );
		this.composition.load( cmp );
		this.call( "compositionLoaded", cmp );
	}
};

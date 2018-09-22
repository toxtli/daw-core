"use strict";

DAW.prototype.openComposition = function( id ) {
	const cmp = this.compositions.get( id );

	if ( cmp ) {
		return this.composition.load( cmp )
			.then( cmp => this._compositionOpened( cmp ) );
	} else {
		console.warn( `DAW.compositions[${ id }] is ${ cmp }` );
		return Promise.reject();
	}
};

DAW.prototype._compositionOpened = function( cmp ) {
	this.cmp = cmp;
	return cmp;
};

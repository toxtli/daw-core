"use strict";

DAWCore.prototype.newComposition = function() {
	return this.addComposition( DAWCore.json.composition( this.env, DAWCore.uuid() ) )
		.then( cmp => this.composition.load( cmp ) )
		.then( cmp => this._compositionOpened( cmp ) );
};

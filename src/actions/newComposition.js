"use strict";

DAW.prototype.newComposition = function() {
	return this.addComposition( DAW.json.composition( this.env, DAW.uuid() ) )
		.then( cmp => this.composition.load( cmp ) )
		.then( cmp => this._compositionOpened( cmp ) );
};

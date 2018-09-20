"use strict";

DAW.prototype.saveComposition = function() {
	if ( this.composition.save() ) {
		this._call( "compositionSaved", this.cmp );
	}
};

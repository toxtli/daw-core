"use strict";

DAWCore.prototype.saveComposition = function() {
	if ( this.composition.save() ) {
		this._call( "compositionSaved", this.get.composition() );
	}
};

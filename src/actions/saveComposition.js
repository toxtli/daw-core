"use strict";

DAW.prototype.saveComposition = function() {
	if ( this.composition.save() ) {
		this.call( "compositionSaved", this.cmp );
	}
};

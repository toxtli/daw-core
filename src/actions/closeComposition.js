"use strict";

DAW.prototype.closeComposition = function() {
	if ( this.cmp ) {
		if ( this.composition.needSave ) {
			const prom = this.call( "askToDiscardComposition", this.cmp );

			if ( prom && prom.then ) {
				prom.then( this.composition.unload );
			}
		} else {
			this.composition.unload()
		}
		this.cmp = null;
	}
};

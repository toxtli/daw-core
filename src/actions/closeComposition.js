"use strict";

DAW.prototype.closeComposition = function() {
	if ( this.cmp ) {
		const prom = this.composition.needSave
				&& this._call( "askToDiscardComposition", this.cmp );

		if ( prom ) {
			prom.then( () => this._closeComposition() );
		} else {
			this._closeComposition();
		}
	}
};

DAW.prototype._closeComposition = function() {
	this.composition.unload();
	this.history.empty();
	this.cmp = null;
};

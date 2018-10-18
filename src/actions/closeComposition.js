"use strict";

DAWCore.prototype.closeComposition = function() {
	if ( this.composition.cmp ) {
		const prom = this.composition.needSave
				&& this._call( "askToDiscardComposition", this.composition.cmp );

		if ( prom ) {
			prom.then( () => this._closeComposition() );
		} else {
			this._closeComposition();
		}
	}
};

DAWCore.prototype._closeComposition = function() {
	this._stopLoop();
	this.composition.unload();
	this.history.empty();
};

"use strict";

DAW.prototype.newSynth = function() {
	this.history.stackChange( this._newSynth() );
};

DAW.prototype._newSynth = function() {
	const id = this._getNextIdOf( this.cmp.synths ),
		name = this._createUniqueName( "synths", "synth" ),
		obj = {
			synths: { [ id ]: DAW.json.synth( name ) },
			synthOpened: id,
		};

	if ( this.cmp.patternOpened != null ) {
		obj.patternOpened = null;
	}
	return obj;
};

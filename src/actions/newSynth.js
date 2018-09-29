"use strict";

DAW.prototype.newSynth = function() {
	this.history.stackChange( this._newSynth() );
};

DAW.prototype._newSynth = function() {
	const id = this._getNextIdOf( this.get.synths() ),
		name = this._createUniqueName( "synths", "synth" ),
		obj = {
			synths: { [ id ]: DAW.json.synth( name ) },
			synthOpened: id,
		};

	if ( this.get.patternOpened() != null ) {
		obj.patternOpened = null;
	}
	return obj;
};

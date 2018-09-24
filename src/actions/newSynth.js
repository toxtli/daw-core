"use strict";

DAW.prototype.newSynth = function() {
	this.history.stackChange( this._newSynth() );
};

DAW.prototype._newSynth = function() {
	const id = this._getNextIdOf( this.cmp.synths ),
		obj = {
			synthOpened: id,
			synths: {
				[ id ]: {
					name: this._createUniqueName( "synths", "synth" ),
					oscillators: {
						"0": {
							order: 0,
							type: "sine",
							detune: 0,
							pan: 0,
							gain: 1,
						}
					}
				}
			}
		};

	if ( cmp.patternOpened != null ) {
		obj.patternOpened = null;
	}
	return obj;
};

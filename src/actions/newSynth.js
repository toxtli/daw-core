"use strict";

DAW.prototype.newSynth = function() {
	this.history.stackChange( this.composition.change( this._newSynth() ) );
};

DAW.prototype._newSynth = function() {
	return {
		synths: {
			[ this._getMaxIdOf( this.cmp.synths ) ]: {
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
};

"use strict";

DAW.prototype.newComposition = function() {
	return this.addComposition( this._newComposition() )
		.then( cmp => this.composition.load( cmp ) )
		.then( cmp => this._compositionOpened( cmp ) );
};

DAW.prototype._newComposition = function() {
	const env = this.env,
		tracks = {};

	for ( let i = 0; i < env.def_nbTracks; ++i ) {
		tracks[ i ] = {};
	}
	return {
		id: DAW.uuid(),
		bpm: env.def_bpm,
		stepsPerBeat: env.def_stepsPerBeat,
		beatsPerMeasure: env.def_beatsPerMeasure,
		name: "",
		duration: 0,
		loopA: false,
		loopB: false,
		patterns: {
			0: {
				name: "pat",
				type: "keys",
				keys: 0,
				synth: 0,
				duration: env.def_beatsPerMeasure
			}
		},
		synths: {
			0: {
				name: "synth",
				oscillators: {
					0: { order: 0, type: "sine", detune: 0, pan: 0, gain: 1 },
				}
			}
		},
		tracks,
		blocks: {},
		keys: { 0: {} },
	};
};

"use strict";

DAW.json.synth = name => ( {
	name,
	oscillators: { "0": {
		order: 0,
		type: "sine",
		detune: 0,
		pan: 0,
		gain: 1,
	} },
} );

"use strict";

class DAW {
	constructor() {
		this.cb = {};
		this.cmp =
		this.cmpId =
		this.synthOpened =
		this.patternOpened = null;
		this.compositions = new Map();
		this.composition = new DAW.Composition();
		this.ctx = new AudioContext();
	}

	call( cbName, a, b, c, d ) {
		const fn = this.cb[ cbName ];

		return fn && fn( a, b, c, d );
	}
	initPianoroll() {
		this.pianoroll = new DAW.Pianoroll( this.ctx );
	}
}

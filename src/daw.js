"use strict";

class DAW {
	constructor() {
		this.cmp =
		this.cmpId =
		this.synthOpened =
		this.patternOpened = null;
		this.compositions = new Map();
		this.composition = new Composition();
		this.ctx = new AudioContext();
	}

	call( cbName, a, b, c, d ) {
		const fn = this[ cbName ];

		fn && fn.call( this, a, b, c, d );
	}
	initPianoroll() {
		this.pianoroll = new DAW.Pianoroll( this.ctx );
	}
}

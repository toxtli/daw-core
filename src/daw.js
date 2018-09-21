"use strict";

class DAW {
	constructor() {
		this.cb = {};
		this.env = {
			def_bpm: 120,
			def_nbTracks: 21,
			def_stepsPerBeat: 4,
			def_beatsPerMeasure: 4,
		};
		this.cmp =
		this.cmpId =
		this.synthOpened =
		this.patternOpened = null;
		this.compositions = new Map();
		this.composition = new DAW.Composition();
		this.history = new DAW.History();
		this.ctx = new AudioContext();
	}

	initPianoroll() {
		this.pianoroll = new DAW.Pianoroll( this.ctx );
	}

	// private:
	_call( cbName, a, b, c, d ) {
		const fn = this.cb[ cbName ];

		return fn && fn( a, b, c, d );
	}
	_getObjFromComposition( collection, id ) {
		return this.cmp ? this.cmp[ collection ][ id ] : null;
	}
	_error( fnName, collection, id ) {
		return !this.cmp
			? `DAW.${ fnName }: cmp is not defined`
			: `DAW.${ fnName }: cmp.${ collection }[${ id }] is not defined`;
	}
	_getMaxIdOf( obj ) {
		return Object.keys( obj )
			.reduce( ( max, k ) => Math.max( max, parseInt( k ) || 0 ), 0 );
	}
	_createUniqueName( collection, name ) {
		return DAW.uniqueName( name, Object.values(
			this.cmp[ collection ] ).map( obj => obj.name ) );
	}
}

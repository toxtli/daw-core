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
		this.pianoroll = null;
		this.compositionFocused = true;
		this.compositions = new Map();
		this.composition = new DAW.Composition( this );
		this.history = new DAW.History( this );
		this.ctx = new AudioContext();
		this.patternrollFocus();
	}

	initPianoroll() {
		this.pianoroll = new DAW.Pianoroll( this.ctx );
	}
	patternrollFocus() {
		if ( !this.patternrollFocused ) {
			this.patternrollFocused = true;
			this._call( "pianorollFocusOut" );
			this._call( "patternrollFocusIn" );
		}
	}
	pianorollFocus() {
		lg( this.patternrollFocused, this.pianoroll, this.cmp, this.cmp.patternOpened )
		if ( this.patternrollFocused && this.pianoroll && this.cmp && this.cmp.patternOpened ) {
			this.patternrollFocused = false;
			this._call( "patternrollFocusOut" );
			this._call( "pianorollFocusIn" );
		}
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

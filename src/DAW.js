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
		this._getInit();
		this.setCtx( new AudioContext() );
	}

	setCtx( ctx ) {
		this.ctx = ctx;
		this.composition.setCtx( ctx );
	}
	initPianoroll() {
		this.pianoroll = new DAW.Pianoroll( this.ctx );
	}
	compositionChange( obj ) {
		this.history.stackChange( obj );
	}
	compositionFocus( force ) {
		if ( !this.compositionFocused ) {
			this._focusOn( true, force );
		}
	}
	pianorollFocus( force ) {
		if ( this.compositionFocused && this.pianoroll && this.get.patternOpened() ) {
			this._focusOn( false, force );
		}
	}

	// private:
	_focusOn( cmpFocused, force ) {
		if ( this.composition.playing !== "playing" || force === "-f" ) {
			this.compositionFocused = cmpFocused;
			this._call( "focusOn", "composition", cmpFocused );
			this._call( "focusOn", "pianoroll", !cmpFocused );
		}
	}
	_call( cbName, a, b, c, d ) {
		const fn = this.cb[ cbName ];

		return fn && fn( a, b, c, d );
	}
	_error( fnName, collection, id ) {
		return !this.cmp
			? `DAW.${ fnName }: cmp is not defined`
			: `DAW.${ fnName }: cmp.${ collection }[${ id }] is not defined`;
	}
	_getNextIdOf( obj ) {
		return Object.keys( obj ).reduce( ( max, id ) => (
			Math.max( max, parseInt( id ) || 0 )
		), 0 ) + 1 + "";
	}
	_createUniqueName( collection, name ) {
		return DAW.uniqueName( name, Object.values(
			this.cmp[ collection ] ).map( obj => obj.name ) );
	}
}

DAW.json = {};

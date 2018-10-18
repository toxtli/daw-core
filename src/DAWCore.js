"use strict";

class DAWCore {
	constructor() {
		this.cb = {};
		this.env = {
			def_bpm: 120,
			def_appGain: .5,
			def_nbTracks: 21,
			def_stepsPerBeat: 4,
			def_beatsPerMeasure: 4,
			analyserFFTsize: 1024,
			analyserEnable: true,
			sampleRate: 44100,
			clockSteps: false,
		};
		this.pianoroll = null;
		this.compositionFocused = true;
		this.compositions = new Map();
		this.composition = new DAWCore.Composition( this );
		this.destination = new DAWCore.Destination( this );
		this.history = new DAWCore.History( this );
		this._loop = this._loop.bind( this );
		this._getInit();
		this.setCtx( new AudioContext() );
	}

	setCtx( ctx ) {
		this.ctx = ctx;
		this.destination.setCtx( ctx );
		this.composition.setCtx( ctx );
	}
	initPianoroll() {
		this.pianoroll = new DAWCore.Pianoroll( this );
	}
	compositionChange( obj ) {
		this.history.stackChange( obj );
	}
	compositionNeedSave() {
		return this.composition.cmp.savedAt ||
			this.history._stack.length;
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
	isPlaying() {
		return this.composition.playing ||
			( this.pianoroll ? this.pianoroll.playing : false );
	}
	togglePlay() {
		this.isPlaying() ? this.pause() : this.play();
	}
	play() {
		if ( this.compositionFocused ) {
			this.composition.play();
		} else {
			this.pianoroll.play();
		}
		this._call( "play", this._focused() );
	}
	pause() {
		this.composition.pause();
		this.pianoroll && this.pianoroll.pause();
		this._call( "pause", this._focused() );
	}
	stop() {
		this.composition.stop();
		this.pianoroll && this.pianoroll.stop();
		this._call( "stop", this._focused() );
		this._call( "currentTime", this._focusedObj().currentTime, this._focused() );
	}

	// private:
	_startLoop() {
		this._loop();
	}
	_stopLoop() {
		cancelAnimationFrame( this._frameId );
	}
	_loop() {
		this.destination.analyserFillData();
		if ( this.isPlaying() ) {
			this._call( "currentTime", this._focusedObj().getCurrentTime(), this._focused() );
		}
		this._frameId = requestAnimationFrame( this._loop );
	}
	_focused() {
		return this.compositionFocused ? "composition" : "pianoroll";
	}
	_focusedObj() {
		return this.compositionFocused ? this.composition : this.pianoroll;
	}
	_focusOn( cmpFocused, force ) {
		if ( force === "-f" || !this.isPlaying() ) {
			this.pause();
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
		return !this.get.composition()
			? `DAWCore.${ fnName }: cmp is not defined`
			: `DAWCore.${ fnName }: cmp.${ collection }[${ id }] is not defined`;
	}
	_getNextIdOf( obj ) {
		return Object.keys( obj ).reduce( ( max, id ) => (
			Math.max( max, parseInt( id ) || 0 )
		), 0 ) + 1 + "";
	}
	_createUniqueName( collection, name ) {
		return DAWCore.uniqueName( name, Object.values(
			this.get[ collection ]() ).map( obj => obj.name ) );
	}
}

DAWCore.json = {};

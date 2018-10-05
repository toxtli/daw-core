"use strict";

DAW.Pianoroll = class {
	constructor( daw ) {
		const waSched = new gswaScheduler(),
			waSynth = new gswaSynth();

		this.daw = daw;
		this.keys = {};
		this.synth = {};
		this.playing = false;
		this.currentTime = 0;
		this._ctx = daw.ctx;
		this._waSched = waSched;
		this._waSynth = waSynth;
		this._keysStarted = {};
		this._keysStartedLive = {};
		waSched.currentTime = () => this._ctx.currentTime;
		waSched.ondatastart = this._startKey.bind( this );
		waSched.ondatastop = this._stopKey.bind( this );
	}

	loadKeys( keys ) {
		// ...
	}
	loadSynth( syn ) {
		// ...
	}
	empty() {
		this.stop();
		if ( this.keys ) {
			// ...
		}
	}

	// ........................................................................
	_startKey( startedId, blc, when, off, dur ) {
		this._keysStarted[ startedId ] =
			this._waSynth.startKey( blc.key, when, off, dur, blc.gain, blc.pan );
	}
	_stopKey( startedId, blc ) {
		this._waSynth.stopKey( this._keysStarted[ startedId ] );
		delete this._keysStarted[ startedId ];
	}

	// controls
	// ........................................................................
	setCurrentTime( t ) {
		this.currentTime = t;
		this._waSched.setCurrentOffset( t );
	}
	setLoop( a, b ) {
		this._waSched.setLoop( a, b );
	}
	setBPM( bpm ) {
		this._waSched.setBPM( bpm );
	}
	liveKeydown( midi ) {
		if ( !( midi in this._keysStartedLive ) ) {
			this._keysStartedLive[ midi ] = this._waSynth.startKey(
				midi, this._waSched.currentTime(), 0, Infinity, .8, 0 );
		}
	}
	liveKeyup( midi ) {
		if ( this._keysStartedLive[ midi ] ) {
			this._waSynth.stopKey( this._keysStartedLive[ midi ] );
			delete this._keysStartedLive[ midi ];
		}
	}
	play() {
		if ( !this.playing ) {
			this._waSched.start( 0, this.currentTime );
			this.playing = true;
		}
	}
	pause() {
		if ( this.playing ) {
			this.playing = false;
			this.currentTime = this._waSched.getCurrentOffset();
			this._waSched.stop();
		}
	}
	stop() {
		if ( this.playing ) {
			this.pause();
		} else {
			this.currentTime = 0;
		}
	}
};

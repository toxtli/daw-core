"use strict";

class Pianoroll {
	constructor() {
		this.keys = {};
		this.synth = null;
		this.playing = false;
		this.currentTime = 0;
		this._sched = new gswaScheduler();
	}

	// load
	// ........................................................................
	load( keys ) {
		this.empty();
		// ...
	}

	// empty
	// ........................................................................
	empty() {
		this.stop();
		if ( this.keys ) {
			// ...
		}
	}

	// controls
	// ........................................................................
	setCurrentTime( t ) {
		this.currentTime = t;
		this._sched.setCurrentOffset( t );
	}
	setLoop( a, b ) {
		this._sched.setLoop( a, b );
	}
	setBPM( bpm ) {
		this._sched.setBPM( bpm );
	}
	liveKeydown( midi ) {

	}
	liveKeyup( midi ) {

	}
	play() {
		if ( !this.playing ) {
			this._sched.start( 0, this.currentTime );
			this.playing = true;
		}
	}
	pause() {
		if ( this.playing ) {
			this.playing = false;
			this.currentTime = this._sched.getCurrentOffset();
			this._sched.stop();
		}
	}
	stop() {
		if ( this.playing ) {
			this.pause();
		} else {
			this.currentTime = 0;
		}
	}
}

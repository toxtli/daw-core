"use strict";

DAWCore.Pianoroll = class {
	constructor( daw ) {
		const waSched = new gswaScheduler();

		this.daw = daw;
		this.keys = {};
		this.looping =
		this.playing = false;
		this._synth =
		this.loopA =
		this.loopB = null;
		this.duration = 0;
		this._ctx = daw.ctx;
		this._waSched = waSched;
		this._keysStarted = {};
		this._keysStartedLive = {};
		waSched.currentTime = () => this._ctx.currentTime;
		waSched.ondatastart = this._startKey.bind( this );
		waSched.ondatastop = this._stopKey.bind( this );
	}

	change( patObj, keysObj ) {
		DAWCore.objectDeepAssign( this._waSched.data, keysObj );
		if ( "duration" in patObj && !this.looping ) {
			this.duration = patObj.duration;
			this._waSched.setLoopBeat( 0, this.duration );
		}
	}
	openPattern( id ) {
		const daw = this.daw,
			wasPlaying = this.playing;

		id
			? daw.pianorollFocus()
			: daw.compositionFocus( "-f" );
		if ( wasPlaying ) {
			daw.stop();
			daw.stop();
		}
		this._waSched.empty();
		if ( id ) {
			const pat = daw.get.pattern( id );

			this._synth = daw.composition.getSynth( pat.synth );
			this.change( pat, daw.get.keys( pat.keys ) );
			if ( wasPlaying ) {
				daw.play();
			}
		} else {
			this._synth = null;
		}
	}

	// ........................................................................
	_startKey( startedId, blc, when, off, dur ) {
		this._keysStarted[ startedId ] =
			this._synth.startKey( blc.key, when, off, dur, blc.gain, blc.pan );
	}
	_stopKey( startedId, blc ) {
		this._synth.stopKey( this._keysStarted[ startedId ] );
		delete this._keysStarted[ startedId ];
	}

	// controls
	// ........................................................................
	getCurrentTime() {
		return this._waSched.getCurrentOffsetBeat();
	}
	setCurrentTime( t ) {
		this._waSched.setCurrentOffsetBeat( t );
	}
	setBPM( bpm ) {
		this._waSched.setBPM( bpm );
	}
	setLoop( a, b ) {
		this.loopA = a;
		this.loopB = b;
		this.looping = true;
		this._waSched.setLoopBeat( a, b );
	}
	clearLoop() {
		this.loopA =
		this.loopB = null;
		this.looping = false;
		this._waSched.setLoopBeat( 0, this.duration || this.daw.get.beatsPerMeasure() );
	}
	liveKeydown( midi ) {
		if ( !( midi in this._keysStartedLive ) ) {
			this._keysStartedLive[ midi ] = this._synth.startKey(
				midi, this._waSched.currentTime(), 0, Infinity, .8, 0 );
		}
	}
	liveKeyup( midi ) {
		if ( this._keysStartedLive[ midi ] ) {
			this._synth.stopKey( this._keysStartedLive[ midi ] );
			delete this._keysStartedLive[ midi ];
		}
	}
	bpm( bpm ) {
		this._waSched.setBPM( bpm );
	}
	play() {
		if ( !this.playing ) {
			this.playing = true;
			this._waSched.startBeat( 0, this.getCurrentTime() );
		}
	}
	pause() {
		if ( this.playing ) {
			this.playing = false;
			this._waSched.stop();
		}
	}
	stop() {
		if ( this.playing ) {
			this.pause();
			this.setCurrentTime( this.loopA || 0 );
		} else {
			this.setCurrentTime( 0 );
		}
	}
};

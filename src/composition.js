"use strict";

DAW.Composition = class {
	constructor() {
		this._cmp = null;
		this.loaded =
		this.playing =
		this.needSave = false;
		this.currentTime = 0;
		this._sched = new gswaScheduler();
	}

	// un/load, change, save
	// ........................................................................
	load( cmpOri ) {
		return new Promise( ( res, rej ) => {
			const cmp = DAW.copyObject( cmpOri );

			if ( this.format( cmp ) ) {
				this.unload();
				res( cmp );
			} else {
				rej();
			}
		} ).then( cmp => {
			this._cmp = cmp;
			this.loaded = true;
			this.needSave = false;
		} );
	}
	unload() {
		if ( this.loaded ) {
			this.loaded =
			this.needSave = false;
			this._cmp = null;
		}
	}
	save() {
		if ( this._cmp && this.needSave ) {
			this.needSave = false;
			return true;
		}
	}
	change( obj ) {
		return obj;
	}

	// controls
	// ........................................................................
	setCurrentTime( t ) {
		this.currentTime = t;
		this._sched.setCurrentOffset( t );
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
};

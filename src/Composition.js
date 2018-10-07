"use strict";

DAW.Composition = class {
	constructor( daw ) {
		this.daw = daw;
		this.cmp = null;
		this.loaded =
		this.playing =
		this.needSave = false;
		this.currentTime = 0;
		this._sched = new gswaScheduler();
	}

	// un/load, change, save
	// ........................................................................
	setCtx( ctx ) {
		this.ctx = ctx;
	}
	load( cmpOri ) {
		return new Promise( ( res, rej ) => {
			const cmp = DAW.objectDeepCopy( cmpOri );

			if ( DAW.Composition.format( cmp ) ) {
				this.unload();
				res( cmp );
			} else {
				rej();
			}
		} ).then( cmp => {
			this.cmp = cmp;
			this.loaded = true;
			this.needSave = false;
			return cmp;
		} );
	}
	unload() {
		if ( this.loaded ) {
			this.loaded =
			this.needSave = false;
			this.cmp = null;
		}
	}
	save() {
		if ( this.cmp && this.needSave ) {
			this.needSave = false;
			return true;
		}
	}
	change( obj, prevObj ) {
		DAW.deepAssign( this.cmp, obj );
		this.daw._call( "compositionChanged", obj, prevObj );
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

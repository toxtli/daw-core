"use strict";

class Composition {
	constructor() {
		this._cmp = null;
		this.loaded =
		this.playing =
		this.needSave = false;
		this.currentTime = 0;
		this._sched = new gswaScheduler();
	}

	// load
	// ........................................................................
	load( cmp ) {
		this.unload();
		return this._load( cmp );
	}
	loadByURL( url ) {
		return fetch( url )
			.then( res => res.json() )
			.then( cmp => this.load( cmp ) );
	}
	loadByFile( file ) {
		// ...
	}
	_load( cmp ) {
		return new Promise( ( res, rej ) => {
			res();
		} ).then( () => {
			this._cmp = cmp;
			this.loaded = true;
			this.needSave = false;
		} );
	}

	// unload
	// ........................................................................
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
}

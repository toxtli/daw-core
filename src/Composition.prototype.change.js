"use strict";

DAW.Composition.prototype.change = function( obj, prevObj ) {
	DAW.objectDeepAssign( this.cmp, obj );
	this.change.fn.forEach( ( fn, attr ) => {
		if ( typeof attr === "string" ) {
			if ( attr in obj ) {
				fn.call( this, obj, prevObj );
			}
		} else if ( attr.some( attr => attr in obj ) ) {
			fn.call( this, obj, prevObj );
		}
	} );
	this.daw._call( "compositionChanged", obj, prevObj );
	return obj;
};

DAW.Composition.prototype.change.fn = new Map( [
	[ "bpm", function( { bpm } ) {
		this._sched.setBPM( bpm );
		this._synths.forEach( syn => syn.setBPM( bpm ) );
		this.daw.pianoroll.setBPM( bpm );
	} ],
	[ [ "loopA", "loopB" ], function() {
		if ( this.daw.compositionFocused ) {
			const get = this.daw.get;

			this._sched.setLoopBeat(
				get.loopA() || 0,
				get.loopB() || get.duration() || get.beatsPerMeasure() );
		}
	} ],
	[ "blocks", function( { blocks } ) {
		this.assignBlocksChange( blocks );
	} ],
	[ "synths", function( { synths }, { synths: prevSynths } ) {
		Object.entries( synths ).forEach( ( [ id, synthObj ] ) => {
			if ( !synthObj ) {
				this._synths.get( id ).stopAllKeys();
				this._synths.delete( id );
			} else if ( !prevSynths[ id ] ) {
				const syn = new gswaSynth();

				syn.setContext( this.daw.get.ctx() );
				syn.setBPM( this.daw.get.bpm() );
				syn.connect( this.daw.get.destination() );
				DAW.objectDeepAssign( syn.data, synthObj );
				this._synths.set( id, syn );
			} else {
				DAW.objectDeepAssign( this._synths.get( id ).data, synthObj );
			}
		} );
	} ],
	[ "keys", function( obj, prevObj ) {
		const pats = Object.entries( this.cmp.patterns ),
			patOpened = this.cmp.patternOpened;

		Object.entries( obj ).forEach( ( [ keysId, keysObj ] ) => {
			pats.some( ( [ patId, patObj ] ) => {
				if ( patObj.keys === keysId ) {
					this.assignPatternChange( patObj, keysObj );
					if ( patId === patOpened ) {
						this.daw.pianoroll.change( patObj, keysObj );
					}
					return true;
				}
			} );
		} );
	} ],
	[ "patternOpened", function( { patternOpened } ) {
		if ( !patternOpened ) {
			this.daw.compositionFocus( "-f" );
		}
	} ],
] );

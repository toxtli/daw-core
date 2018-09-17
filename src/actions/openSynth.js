"use strict";

DAW.prototype.openSynth = function( id ) {
	if ( id !== this.synthOpened ) {
		const cmp = this.cmp,
			syn = cmp.synths[ id ],
			synOpened = this.synthOpened,
			patOpened = this.patternOpened;

		this.pianoroll.loadSynth( syn );
		this.synthOpened =
		cmp.synthOpened = id;
		if ( synOpened ) {
			this.call( "synthesizerClosed", synOpened );
		}
		this.call( "synthesizerOpened", id, syn );
		if ( !Object.entries( cmp.patterns ).some( ( [ patId, pat ] ) => {
			if ( pat.synth === id ) {
				this.pianoroll.loadKeys( cmp.keys[ pat.keys ] );
				this.patternOpened =
				cmp.patternOpened = patId;
				if ( patOpened ) {
					this.call( "patternClosed", patOpened );
				}
				this.call( "patternOpened", patId, pat );
				return true;
			}
		} ) && patOpened ) {
			this.pianoroll.empty();
			this.patternOpened =
			cmp.patternOpened = null;
			this.call( "patternClosed", patOpened );
		}
	}
};

"use strict";

DAW.prototype.openPattern = function( id ) {
	if ( id !== this.patternOpened ) {
		const cmp = this.cmp,
			pat = cmp.patterns[ id ],
			synId = pat.synth,
			synOpened = this.synthOpened,
			patOpened = this.patternOpened;

		this.pianoroll.loadKeys( cmp.keys[ pat.keys ] );
		this.patternOpened =
		cmp.patternOpened = id;
		if ( synId !== synOpened ) {
			const syn = cmp.synths[ synId ];

			this.pianoroll.loadSynth( syn );
			this.synthOpened =
			cmp.synthOpened = synId;
			if ( synOpened ) {
				this.call( "synthesizerClosed", synOpened );
			}
			this.call( "synthesizerOpened", synId, syn );
		}
		if ( patOpened ) {
			this.call( "patternClosed", patOpened );
		}
		this.call( "patternOpened", id, pat );
	}
};

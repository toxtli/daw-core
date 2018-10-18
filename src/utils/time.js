"use strict";

DAWCore.time = {

	// mixtes:
	beatToMin( beat, bpm ) {
		return ~~( beat / bpm );
	},
	beatToSec( beat, bpm ) {
		return DAWCore.time._padZero( beat * 60 / bpm % 60 );
	},
	beatToMinSec( beat, bpm ) {
		return DAWCore.time.beatToMin( beat, bpm ) + ":" +
			DAWCore.time.beatToSec( beat, bpm );
	},

	// beats:
	beatToBeat( beat ) {
		return "" + ~~( beat + 1 );
	},
	beatToStep( beat, stepsPerBeat ) {
		return DAWCore.time._padZero( beat % 1 * stepsPerBeat + 1 );
	},
	beatToMStep( beat, stepsPerBeat ) {
		return DAWCore.time._getMil( beat % 1 * stepsPerBeat );
	},

	// seconds:
	secToMin( sec ) {
		return "" + ~~( sec / 60 );
	},
	secToSec( sec ) {
		return DAWCore.time._padZero( sec % 60 );
	},
	secToMs( sec ) {
		return DAWCore.time._getMil( sec );
	},

	// private:
	_getMil( val ) {
		val = ~~( val * 1000 % 1000 );
		return ( val < 10 ? "00" : val < 100 ? "0" : "" ) + val;
	},
	_padZero( val ) {
		return ( val < 10 ? "0" : "" ) + ~~val;
	}
};

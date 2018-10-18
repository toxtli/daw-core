"use strict";

DAWCore.objectIsEmpty = obj => {
	for ( const a in obj ) {
		return false;
	}
	return true;
};

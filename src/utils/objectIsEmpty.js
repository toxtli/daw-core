"use strict";

DAW.objectIsEmpty = obj => {
	for ( const a in obj ) {
		return false;
	}
	return true;
};

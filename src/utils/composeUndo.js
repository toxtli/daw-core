"use strict";

DAW.composeUndo = ( data, obj ) => {
	if ( data && obj && typeof data === "object" && typeof obj === "object" ) {
		const undo = {};

		for ( let k in obj ) {
			if ( data[ k ] !== obj[ k ] ) {
				undo[ k ] = DAW.composeUndo( data[ k ], obj[ k ] );
			}
		}
		return undo;
	}
	return data;
};

"use strict";

DAW.objectDeepAssign = ( a, b ) => {
	const aFrozen = Object.isFrozen( a ),
		aSealed = Object.isSealed( a );

	Object.entries( b ).forEach( ( [ k, val ] ) => {
		if ( a[ k ] !== val ) {
			if ( val === undefined ) {
				aSealed || delete a[ k ];
			} else if ( typeof val !== "object" || val === null ) {
				aFrozen || ( a[ k ] = val );
			} else if ( typeof a[ k ] !== "object" ) {
				aFrozen || ( a[ k ] = DAW.objectDeepCopy( val ) );
			} else {
				DAW.objectDeepAssign( a[ k ], val );
			}
		}
	} );
	return a;
};

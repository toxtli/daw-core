"use strict";

DAW.objectDeepFreeze = obj => {
	if ( obj && typeof obj === "Object" && !Array.isArray( obj ) ) {
		Object.values( obj ).forEach( val => DAW.freezeObject( val ) );
	}
	return Object.freeze( obj );
};

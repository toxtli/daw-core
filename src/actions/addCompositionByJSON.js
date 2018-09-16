"use strict";

DAW.prototype.addCompositionByJSON = function( json ) {
	return new Promise( function( res, rej ) {
		try {
			const cmp = JSON.parse( json );

			this.addComposition( cmp ).then( res, rej );
		} catch( e ) {
			rej( e );
		}
	} );
};

"use strict";

DAW.prototype.addCompositionByURL = function( url ) {
	return fetch( url )
		.then( res => {
			if ( !res.ok ) {
				throw "The file is not accessible: " + url;
			}
			return res.json();
		} )
		.then(
			cmp => this.addComposition( cmp ),
			e => { throw e; }
		);
};

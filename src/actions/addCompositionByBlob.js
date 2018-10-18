"use strict";

// a read check is missing somewhere...

DAWCore.prototype.addCompositionByBlob = function( blob ) {
	return new Promise( ( res, rej ) => {
		const rd = new FileReader();

		rd.onload = () => {
			this.addCompositionByJSON( rd.result ).then( res, rej );
		};
		rd.readAsText( blob );
	} );
};

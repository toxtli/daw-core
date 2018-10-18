"use strict";

DAWCore.castToNumber = ( min, max, def, n ) => {
	return Number.isFinite( +n ) ? Math.max( min, Math.min( n, max ) ) : def;
};

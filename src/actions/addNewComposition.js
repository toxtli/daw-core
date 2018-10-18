"use strict";

DAWCore.prototype.addNewComposition = function() {
	return this.addComposition(
		DAWCore.json.composition( this.env, DAWCore.uuid() ) );
};

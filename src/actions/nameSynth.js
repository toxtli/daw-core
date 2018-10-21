"use strict";

DAWCore.prototype.nameSynth = function( id, name ) {
	const syn = this.get.synth( id );

	syn
		? this._nameSynth( id, syn, name )
		: this._error( "nameSynth", "synths", id );
};

DAWCore.prototype._nameSynth = function( id, syn, newName ) {
	const name = DAWCore.trim2( newName );

	if ( name && name !== syn.name ) {
		this.compositionChange( { synths: { [ id ]: { name } } } );
	}
};

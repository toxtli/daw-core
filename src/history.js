"use strict";

DAW.History = class {
	constructor( daw ) {
		this.daw = daw;
		this._stack = [];
		this._stackInd = 0;
		this._stackCue = -1;
	}

	empty() {
		const stack = this._stack;

		while ( stack.length ) {
			this.daw._call( "historyDeleteAction", stack.pop() );
		}
		this._stackInd = 0;
	}
	stackChange( obj ) {
		const stack = this._stack,
			act = {
				redo: obj,
				undo: DAW.composeUndo( this.daw.composition.cmp, obj ),
			};

		while ( stack.length > this._stackInd ) {
			this.daw._call( "historyDeleteAction", stack.pop() );
		}
		++this._stackInd;
		act.index = stack.push( act );
		this._change( act, "redo", "historyAddAction" );
	}
	getCurrentAction() {
		return this._stack[ this._stackInd - 1 ];
	}
	goToAction( act ) {
		let n = act.index - this._stackInd;

		if ( n < 0 ) {
			while ( n++ < 0 ) { this.undo(); }
		} else if ( n > 0 ) {
			while ( n-- > 0 ) { this.redo(); }
		}
		return false;
	}
	undo() {
		if ( this._stackInd > 0 ) {
			return this._change( this._stack[ --this._stackInd ], "undo", "historyUndo" );
		}
		return false;
	}
	redo() {
		if ( this._stackInd < this._stack.length ) {
			return this._change( this._stack[ this._stackInd++ ], "redo", "historyRedo" );
		}
		return false;
	}

	// private:
	_change( act, undoredo, cbStr ) {
		const obj = act[ undoredo ];

		this.daw._call( cbStr, act );
		this.daw.composition.change( obj );
		return obj;
	}
};

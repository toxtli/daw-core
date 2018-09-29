"use strict";

Object.assign( DAW.prototype, {
	_getInit() {
		const listnames = [ "synth", "pattern", "block", "track", "keys" ],
			cmp = () => this.cmp,
			getList = list => cmp() && cmp()[ list ],
			getObject = ( list, id ) => cmp() && cmp()[ list ][ id ],
			obj = listnames.reduce( ( obj, w ) => {
				if ( w.endsWith( "s" ) ) {
					obj[ w ] = this._getListOrObj.bind( this, w );
				} else {
					const list = w + "s";

					obj[ w ] = getObject.bind( this, list );
					obj[ list ] = getList.bind( this, list );
				}
				return obj;
			}, {} );

		this.get = obj;
		this._getList = getList;
		obj.composition = cmp;
		obj.synthOpened = () => cmp() || cmp().synthOpened;
		obj.patternOpened = () => cmp() || cmp().patternOpened;
		obj.beatsPerMeasure = () => cmp() || cmp().beatsPerMeasure;
	},
	_getListOrObj( listname, id ) {
		const list = this._getList( listname );

		return list && arguments.length === 2 ? list[ id ] : list;
	},
} );

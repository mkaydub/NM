class Helper {
	static baseURL() {
		return 'https://api.foursquare.com/v2'
	}
	static auth() {
		const keys = {
			client_id: 'JTDE251NXNVGJQRKGQKVDF0IIQWDW34GNNKJIHTYI2EZBZNV',
			client_secret: 'SUHJMVAK5L2HBVMBH3ZGOKY2VV3S0420KAIQN5J3XACBONEW',
			v: '20181006'
		};
		return Object.keys( keys )
			.map( key => `${key}=${keys[key]}` )
			.join( '&' );
	}
	static urlBuilder( urlPrams ) {
		if ( !urlPrams ) {
			return ''
		}
		return Object.keys( urlPrams )
			.map( key => `${key}=${urlPrams[key]}` )
			.join( '&' )
	}
	static headers() {
		return {
			Accept: 'application/json'
		};
	}
	static simpleFetch( endPoint, method, urlPrams ) {
		let requestData = {
			method,
			headers: Helper.headers()
		};
		return fetch(
			`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,
			requestData
		).then( res => res.json() );
	}
}

export default class SquareAPI {
	static search( urlPrams ) {
		return Helper.simpleFetch( '/venues/search', 'GET', urlPrams )
	}
	static getVenueDetails( VENUE_ID ) {
		return Helper.simpleFetch( `/venues/${VENUE_ID}`, 'GET' );
	}
	static getVenuePhotos( VENUE_ID ) {
		return Helper.simpleFetch( `/venues/${VENUE_ID}/photos`, 'GET' );
	}
}

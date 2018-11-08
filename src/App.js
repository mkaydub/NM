import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js'
import SquareAPI from './API/'

class App extends Component {
	state = {
		venues: [],
		markers: [],
		center: {},
		zoom: 13,
		map: null,
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		animation: null
	}


	onMarkerClick = ( props, marker, e ) => {
		this.setState( {
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			animation: 1
		} );
		const venue = this.state.venues.find( venue => venue.id === marker.id );
		SquareAPI.getVenueDetails( marker.id ).then( res => {
			const newVenue = Object.assign( venue, res.response.venue );
			this.setState( { venues: Object.assign( this.state.venues, newVenue ) } )
			console.log( newVenue )
		} )
	}


	onMapClick = ( props ) => {
		if ( this.state.showingInfoWindow ) {
			this.setState( {
				showingInfoWindow: false,
				activeMarker: {},
				animation: null
			} )
		}
		console.log( 'clicked' )
	};

	componentDidMount() {
		SquareAPI.search( {
			near: 'Denver, CO',
			limit: 20,
			query: 'sushi'
		} ).then( results => {
			const { venues } = results.response;
			const { center } = results.response.geocode.feature.geometry;
			const markers = venues.map( venue => {
				return {
					lat: venue.location.lat,
					lng: venue.location.lng,
					isOpen: false,
					isVisible: true,
					name: venue.name,
					id: venue.id,
					rating: venue.rating,
				};
			} );
			this.setState( { venues, center, markers } );
			console.log( venues, markers )

		} );
	}



	render() {
		return (
			<div className="App">
        <div>
					<h1>Denver, Colorado Foodie Scene</h1>
        <MapContainer
          {...this.state}
					onMarkerClick= {this.onMarkerClick}
					onMapClick = {this.onMapClick}
					onClose = {this.closeWindow}
					animation = {1}
					/>
        </div>


      </div>
		);
	}
}

export default App;

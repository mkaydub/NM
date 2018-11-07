import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js'
import SquareAPI from './API/'

class App extends Component {
	state = {
		venues: [],
		markers: [],
		center: {},
		zoom: 15,
		map: null,
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
	}

	componentDidMount() {
		SquareAPI.search( {
			near: 'Denver, CO',
			limit: 50,
			query: 'sushi'
		} ).then( results => {
			const { venues } = results.response;
			const { center } = results.response.geocode.feature.geometry;
			const { markers } = venues.map( venue => {
				return {
					lat: venue.location.lat,
					lng: venue.location.lng,
					isOpen: false,
					isVisible: true
				};
			} );
			this.setState( { venues, center, markers } );
			for ( var i = 0; i < venues.length; i += 1 ) {
				console.log( venues[ i ].location.lat, venues[ i ].location.lng );
			}
		} );
	}


	render() {
		return (
			<div className="App">
        <div>
					<h1>Denver, Colorado Foodie Scene</h1>
        <MapContainer
          {...this.state}/>
        </div>


      </div>
		);
	}
}

export default App;

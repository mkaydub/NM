import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js'
import SquareAPI from './API/'
import CssBaseline from '@material-ui/core/CssBaseline';
import SideMenu from './components/SideMenu.js'

class App extends Component {
	state = {
		venue: [],
		venues: [],
		markers: [],
		center: {},
		zoom: 13,
		map: null,
		showingInfoWindow: false,
		activeMarker: {},
		selectedPlace: {},
		animation: null,
		open: false,
		all: this.venues,
		filtered: [],
		query: '',
		selectedIndex: null,
		clickedVenue: {},
	}

	onMarkerClick = ( props, marker, e ) => {
		this.setState( {
			selectedPlace: props,
			activeMarker: marker,
			showingInfoWindow: true,
			animation: 1
		} );
		const venue = this.state.venues.filter( venue => venue.id === marker.id );
		SquareAPI.getVenueDetails( marker.id ).then( res => {
			console.log( 'after fs update to venues:', Object.assign( venue,
				res.response.venue ) );
			this.setState( {
				venue: Object.assign( venue, res.response.venue ),
				center: res.response.venue.location
			} )
		} )
	}

	onMapClick = ( props ) => {
		if ( this.state.showingInfoWindow ) {
			this.setState( {
				showingInfoWindow: false,
				activeMarker: {},
				animation: null,
				open: false
			} )
		}
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
					rating: venue.rating
				};
			} );
			this.setState( {
				venues,
				center,
				markers
			} );
		} );

	}

	toggleDrawer = () => {
		// Toggle the value controlling whether the drawer is displayed
		this.setState( {
			open: !this.state.open,
			filtered: this.state.venues
		} );
	}
	updateQuery = ( query ) => {
		// Update the query value and filter the list of locations accordingly
		this.setState( {
			...this.state,
			selectedPlace: null,
			filtered: this.filterVenue( this.state.venues, query )
		} );
		console.log( 'app level update',
			this.state.filtered )
	}

	filterVenue = ( venues, query ) => {
		// Filter locations to match query string
		return this.state.venues.filter( venue => venue.name.toLowerCase()
			.includes( query.toLowerCase() ) );

	}

	clickListItem = ( index ) => {
		// Set the state to reflect the selected location array index
		this.setState( {
			open: !this.state.open,
			selectedIndex: index,
			animation: 1
		} )

		const clickedVenue = this.state.venues[ index ];
		SquareAPI.getVenueDetails( clickedVenue.id ).then( res => {
			console.log( 'after fs update to venues:', Object.assign( clickedVenue,
				res.response.venue ) );
			this.setState( {
				clickedVenue: Object.assign( clickedVenue, res.response.venue ),
				activeMarker: clickedVenue
			} )
		} )
	}

	render() {
		return (
			<div className='App'>
				<CssBaseline />
        <div className='header'>
					<button className='hamburger' onClick={this.toggleDrawer}>
		 <i className='fas fa-bars '></i>
	 </button>
					<h1>Denver, Colorado - Sushi Scene</h1>
					<p className='powered'>Powered By Google Maps & FourSquare</p>
        <MapContainer
          {...this.state}
					filtered={this.state.filtered}
					onMarkerClick= {this.onMarkerClick}
					onMapClick = {this.onMapClick}
					onClose = {this.closeWindow}
					selectedIndex={this.state.selectedIndex}
					onListClick = {this.clickListItem}
					clickedVenue= {this.state.clickedVenue}

					/>
				<SideMenu
					{...this.state}
					clickedVenue= {this.state.clickedVenue}
					showingInfoWindow= {!this.state.showingInfoWindow}
					filtered={this.state.filtered}
          open={this.state.open}
          toggleDrawer={this.toggleDrawer}
					filterVenues= {this.updateQuery}
					clickListItem = {this.clickListItem}
					/>
        </div>
      </div>
		);
	}
}

export default App;

import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';
import NoMap from './NoMap.js';

const API_Key = 'AIzaSyDiWwXhqwiyeCoyClgDNrNbFmDNq5QwCrk'


export class MapContainer extends Component {
	state = {};

	realMarkers = [];
	setRealMarker = marker => {
		this.realMarkers.push( marker.marker );
		console.log( "realMarkers: ", this.realMarkers );
	}

	componentDidMount = () => {}

	render() {
		if ( this.props.venues.length !== this.realMarkers.length )
			this.realMarkers = [];
		const targetMarker = this.realMarkers[ this.props.selectedIndex ];

		if ( !this.props.loaded ) {
			return <div>Loading...</div>
		}

		const style = {
			width: '100%',
			height: '100%'
		}

		return (
			<Map
                role='application'
                aria-label='map'
                google={this.props.google}
                style={style}
                onClick={this.props.onMapClick}
                center={this.props.center}
								animation= {this.props.animation}
								zoom = {this.props.zoom}>

								{this.props.venues && this.props.venues.map( (venue,index) =>  (
									<Marker
												ref = {this.setRealMarker}
												icon={{ url: '/markericon.png' }}
											  position = {{lat:venue.location.lat, lng:venue.location.lng}}
                        key = {index}
												name = {venue.name}
												id = {venue.id}
                        onClick={ this.props.onMarkerClick }
												animation ={this.props.activeMarker ? (this.props.activeMarker.id === venue.id ? '1' : '0') : null}
												onListClick= {this.props.clickListItem}/>
								 ))}


								<InfoWindow
									ref = {this.setRealMarker}
											marker={this.props.activeMarker}
											filtered = {this.props.filtered}
											onOpen={this.props.windowHasOpened}
											onClose={this.props.closeWindow}
											visible={this.props.showingInfoWindow}
											>
											<div>
												<h2>{this.props.venue.name}</h2>
													{this.props.venue && this.props.venue.location
														? (
													 <div>
														<p>{this.props.venue.location.address}</p>
													</div>
													)
													: ''
												}
												{this.props.venue && this.props.venue.url
													? (
														<div>
															<p><a href={this.props.venue.url} rel='noopener noreferrer'>{this.props.venue.name} Website</a></p>
													</div>
												)
														: ''
													}
													{this.props.venue && this.props.venue.bestPhoto
														? (
													 <div>
														<img
															alt ={this.props.venue.name} src ={`${this.props.venue.bestPhoto.prefix}100x100${this.props.venue.bestPhoto.suffix}`}/>
													</div>
													)
													: <img src='/ni.png' alt={this.props.venue.name}/>
												}
												<div>
												{this.props.venue && this.props.venue.rating
													? (
														<div>
															<p>Rating: {this.props.venue.rating}</p>
															<p><a href={this.props.venue.canonicalUrl} rel='noopener noreferrer'>FourSquare Listing</a></p>
													</div>
												)
														: <p>No Ratings Yet</p>
													}
													</div>
													<div>
														{this.props.venue && this.props.venue.hours
															? (
														 <div>
															<p>Todays hours: {this.props.venue.hours.status} </p>
														</div>
														)
														: <p>Todays Hours: Closed</p>
													}
												</div>
											</div>
										</InfoWindow>

      </Map>
		);
	}
}
MapContainer.propTypes = {
	google: PropTypes.object,
	zoom: PropTypes.number
}

export default GoogleApiWrapper( {
	apiKey: API_Key,
	LoadingContainer: NoMap
} )( MapContainer )

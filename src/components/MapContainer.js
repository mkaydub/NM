import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

const API_Key = 'AIzaSyDiWwXhqwiyeCoyClgDNrNbFmDNq5QwCrk'


export class MapContainer extends Component {
	state = {};

	componentDidMount = () => {}



	componentWillReceiveProps = ( props ) => {
		if ( !props.selectedIndex || ( this.state.activeMarker &&
				( this.state.markers[ props.selectedIndex ] !== this.state.activeMarker ) ) ) {
			this.closeInfoWindow();
		}
		if ( this.props.selectedIndex === null || typeof ( this.props.selectedIndex ) ===
			"undefined" ) {
			return;
		};
	}

	closeInfoWindow = () => {
		this.state.activeMarker &&
			this.state.activeMarker.setAnimation( null );
		this.setState( { showingInfoWindow: false, activeMarker: null } )
	}



	render() {
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
												icon={{ url: '/markericon.png' }}
											  position = {{lat:venue.location.lat, lng:venue.location.lng}}
                        key = {index}
												name = {venue.name}
												id = {venue.id}
                        onClick={ this.props.onMarkerClick }
												animation ={this.props.activeMarker ? (this.props.activeMarker.id === venue.id ? '1' : '0') : null}/>
								 ))}


								<InfoWindow
											marker={this.props.activeMarker}
											onOpen={this.props.windowHasOpened}
											onClose={this.props.closeWindow}
											visible={this.props.showingInfoWindow}>
											<div>
												<h1>{this.props.venue.name}</h1>
													{this.props.venue && this.props.venue.bestPhoto
														? (
													 <div>
														<img
															src ={`${this.props.venue.bestPhoto.prefix}100x100${this.props.venue.bestPhoto.suffix}`}/>
													</div>
													)
													: <img src='/ni.png'/>
												}
												<div>
												{this.props.venue && this.props.venue.rating
													? (
														<div>
															<p>Rating: {this.props.venue.rating}</p>
															<a href={this.props.venue.canonicalUrl} target='_blank'>Foursquare Listing</a>
													</div>
												)
														: <p>No Ratings Yet</p>
													}
													</div>
												</div>							</InfoWindow>

      </Map>
		);
	}
}
MapContainer.propTypes = {
	google: PropTypes.object,
	zoom: PropTypes.number
}

export default GoogleApiWrapper( {
	apiKey: API_Key
} )( MapContainer )

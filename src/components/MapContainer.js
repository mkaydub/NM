import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

const API_Key = 'AIzaSyDiWwXhqwiyeCoyClgDNrNbFmDNq5QwCrk'


export class MapContainer extends Component {
	state = {};

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
                center={this.props.center}>

                {this.props.venues && this.props.venues.map( (venue,index) =>  (
                    <Marker
                        position = {{lat:venue.location.lat, lng:venue.location.lng}}
                        key = {index}
												name = {venue.name}
                        onClick={ this.props.onMarkerClick }
												animation ={this.props.activeMarker.name === venue.name ? this.props.google.maps.Animation.BOUNCE : null }
                    />
                ))}

          <InfoWindow
            marker={this.props.activeMarker}
            onOpen={this.props.windowHasOpened}
            onClose={this.props.windowHasClosed}
            visible={this.props.showingInfoWindow}>
              <div>
                <h1>{this.props.activeMarker.name}</h1>
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
	apiKey: API_Key
} )( MapContainer )

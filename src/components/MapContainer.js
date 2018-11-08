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
				{...this.props}
				role='application'
				aria-label='map'
        google={this.props.google}
        style={style}
        onClick={this.closeInfoWindow}
				center={this.props.center}>

				{this.props.markers &&
				this.props.markers
					.filter(marker => this.props.markers)
					.map( (marker,index) =>  (
        		<Marker
							position = {{lat:this.props.markers[0].lat, lng:this.props.markers[0].lng}}
							key = {index}
          		onClick={this.onMarkerClick}

 							/>
								))}

          <InfoWindow
            marker={this.activeMarker}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            visible={this.showingInfoWindow}>
              <div>
                <h1>{this.props.selectedPlace.name}</h1>
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

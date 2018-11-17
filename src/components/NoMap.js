import React, { Component } from 'react';

class NoMap extends Component {
	state = {
		show: false,
		timeout: null
	}

	componentDidMount = () => {
		let timeout = window.setTimeout( this.showMessage, 1000 );
		this.setState( { timeout } );
	}

	componentWillUnmount = () => {
		window.clearTimeout( this.state.timeout );
	}

	showMessage = () => {
		this.setState( { show: true } );
	}

	render = () => {
		return (
			<div className='errorScreen'>
				{/*if there is an error loading the map, show this error message*/}
                {this.state.show
                    ? (
                        <div className='errorScreen'>
                            <h1>Error loading map</h1>
                            <p className='error'>
                                Oh No! Could not load map due to a network error.Try again when you're online.</p>
                        </div>
		): ( <div><h1>Loading...</h1></div> )
	} </div>
		)
	}
}
export default NoMap;

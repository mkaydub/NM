import React, { Component } from 'react';
import './App.css';
import MapContainer from './components/MapContainer.js'

class App extends Component {
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

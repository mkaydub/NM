import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class SideMenu extends Component {
	state = {
		open: true,
		query: '',
		showingInfoWindow: false
	}

	componentDidMount() {
		this.setState( {
			showingInfoWindow: false
		} )
	}

	updateQuery = ( newQuery ) => {
		// Save the new query string in state and pass the string
		this.setState( { query: newQuery } );
		this.props.filterVenues( newQuery );
		//	console.log( 'side menu', this.props.filtered )
	}

	render() {

		return (
			<Drawer open= {this.props.open}
			onClose = { this.props.toggleDrawer }  >
			<div className='filter'>
        <div className='listHeader'>You have options</div>
          <div className='filterH'>
            <input
              className='filterPlaceholderText'
              type="text"
              placeholder="Filter list"
              name="filter"
              onChange={e => this.updateQuery(e.target.value)}

              value={this.state.query} />
         </div>
          <ul>
						{/*only show filtered items in list drawer*/}
           {this.props.filtered && this
                                .props
                                .filtered
                                .map((venue, index) => {
                                    return (
                                        <li
                                        key={index}>
                                            <button
                                              marker= {this.props.activeMarker}
                                              onClick={() => this.props.clickListItem(index)}
                                              className = 'venueList'
                                              key={index}
                                              >{venue.name}
                                              </button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div> </Drawer>
		)
	}
}

export default SideMenu;

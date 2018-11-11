import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class SideMenu extends Component {
	state = {
		open: true,
		query: ''
	}

	updateQuery = ( newQuery ) => {
		// Save the new query string in state and pass the string
		// up the call tree
		this.setState( { query: newQuery } );
		this.props.filterVenues( newQuery );
		console.log( 'side menu', this.props.filtered )
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
           {this.props.filtered && this
                                .props
                                .filtered
                                .map((venue, index) => {
                                    return (
                                        <li
                                        key={index}>
                                            <button
                                              venue= {venue}
                                              onClick={() => this.props.clickListItem(index)}
                                              className = 'venueList'
                                              key={index}>{venue.name}</button>
                                        </li>
                                    )
                                })}
                        </ul>
                    </div> </Drawer>
		)
	}
}

export default SideMenu;

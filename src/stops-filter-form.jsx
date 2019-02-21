import React from 'react';

export default class StopsFilterForm extends React.Component {
    
    handleChange = (e) => {
	this.props.setBusStopNameFilter(e.target.value)
    }
    
    render() {
	return <div>
            <label htmlFor="filterBusStopName">Filter by Bus Stop Name: </label>
            <input type="text" id="filterBusStopName"
	onChange={this.handleChange}/>
	    </div>
    }
}

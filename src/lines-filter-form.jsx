import React from 'react';

export default class LinesFilterForm extends React.Component {
    
    handleChange = (e) => {
	this.props.setBusLineNameFilter(e.target.value)
    }
    
    render() {
	return <div>
            <label htmlFor="filterBusLineName">Filter by Bus Line Name: </label>
            <input type="text" id="filterBusLineName"
	onChange={this.handleChange}/>
	    </div>
    }
}

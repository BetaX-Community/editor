import React from 'react';

export default class Lines extends React.Component {
    constructor() {
	super()
	this.state = {
	    items: []
	}
    }
    componentDidMount () {
	
	fetch('http://localhost:2999/lines')
	    .then(response => response.json().then(data => this.setState({ items: data })))
	    .catch(error => console.log(error));
    }
    
    handleClick = (index) => {
	this.props.setSelectedBusLineName(this.state.items.filter((busLineName) => {
	    return busLineName.indexOf(this.props.busLineNameFilter.toLowerCase()) !== -1
	})[index]);
	fetch('http://localhost:2999/stops/' + this.state.items.filter((busLineName) => {
		return busLineName.indexOf(this.props.busLineNameFilter.toLowerCase()) !== -1
	    })[index])
	    .then(response => response.json().then(data => this.props.setStops(() => data.map(item => {
		item.display = true;
		return item;
	    }))))
	    .catch(error => console.log(error));
	fetch('http://localhost:2999/ways/' + this.state.items.filter((busLineName) => {
		return busLineName.indexOf(this.props.busLineNameFilter.toLowerCase()) !== -1
	    })[index])
	    .then(response => response.json().then(data => this.props.setWays(() => data)))
	    .catch(error => console.log(error));
    }
    
    render () {
	return <ul> {
	    this.state.items.filter((busLineName) => {
		return busLineName.indexOf(this.props.busLineNameFilter.toLowerCase()) !== -1
	    }).map((item, index) => <li key={index} onClick={() => this.handleClick(index)}>{ item }</li>)
	}
	</ul>
    }
}

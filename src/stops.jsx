import React from 'react';

export default class Stops extends React.Component {
    constructor() {
	super()
	this.state = {
	    items: []
	}
    }

    componentDidMount () {
	let idx = 0;
	fetch('http://localhost:2999/busStops')
	    .then(response => response.json().then(data => this.setState({ items: data })))
	    .then(() => this.state.items.map(item => {
		item.display = false;
		item.id = idx++;
		return item;
	    }))
	    .then(() => this.props.setBusStops(this.state.items))
	    .catch(error => console.log(error));
    }

    handleClick = (index) => {
	this.props.setSelectedBusStopName(this.state.items[index].name);
	this.props.setBusStops((busStops) => {
	    let prevState = this.state.items[index].display;
	    return busStops.map((busStop, idx) => {
		if (idx === index)
		    busStop.display = !prevState;
		return busStop;
	    });

	});
	console.log(this.state.items.filter((busStop) => {
	    return busStop.name.toLowerCase().indexOf(this.props.busStopNameFilter.toLowerCase()) !== -1
	})[index]);
    }
    

    render () {
	return <ul> {
	    this.state.items.filter((busStop) => {
		return busStop.name.toLowerCase().indexOf(this.props.busStopNameFilter.toLowerCase()) !== -1
	    }).map((item, index) => <li key={index} onClick={() => this.handleClick(item.id)}>{ item.name } <img src={ 'images/' + (item.display ? 'checked': 'unchecked') + '.png' } alt={ item.display ? 'checked': 'unchecked' } /></li>)
	}
	</ul>
    }
}

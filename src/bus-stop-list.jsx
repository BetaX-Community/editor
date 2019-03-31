import React from 'react';

export default class BusStopList extends React.Component {
    render() {
        return <ul>{
	    this.props.stops.map((item, index) =>
	    	<li key={index} onClick={() => {
	            this.props.setStops((stops) => {
		        var clickedEl = stops[index];
		        clickedEl.display = !clickedEl.display;
		        return [...stops.slice(0, index), clickedEl,...stops.slice(index + 1)]
	    	    });
	        }}>
	          { item.name } { item.location.lat }, { item.location.lng } <img src={ 'images/' + (item.display ? 'checked': 'unchecked') + '.png' } alt={ item.display ? 'checked': 'unchecked' } />
		</li>
	    )
	    }
	    {
	    this.props.clickCoords.map((item, index) => <li key={index} onClick={() => this.props.setClickCoords(clickCoords => [...clickCoords.slice(0, index), ...clickCoords.slice(index + 1)])}>
	    { item.lat() }, { item.lng() }
	    </li>)
	    }
	</ul>
    }
}

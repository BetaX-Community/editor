import React from 'react';
//import { DragDropContext } from 'react-beautiful-dnd';

export default class BusStopList extends React.Component {
    render() {
        var busStops = [...this.props.stops, ...this.props.clickCoords.map(obj => ({ ...obj, location: { lat: obj.lat(), lng: obj.lng() }, name: "", display: true }))];
        console.log(busStops);
        return <ul>{
            
	    busStops.map((item, index) =>
	    	<li key={index} onClick={() => {
	            this.props.setStops(() => {
		       var clickedEl = busStops[index];
		       clickedEl.display = !clickedEl.display;
		       return [...busStops.slice(0, index), clickedEl,...busStops.slice(index + 1)]
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

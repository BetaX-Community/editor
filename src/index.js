import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withState } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline
} from "react-google-maps";

const gmaps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      `https://maps.googleapis.com/maps/api/js?key=${gmaps_api_key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
    withGoogleMap,
    withState('stops', 'setStops', []),
    withState('stop', 'setBusStops', []),
    withState('ways', 'setWays', []),
    withState('busLineNameFilter', 'setBusLineNameFilter', ''),
    withState('busStopNameFilter', 'setBusStopNameFilter', ''),
    withState('selectedBusLineName', 'setSelectedBusLineName', ''),
    withState('selectedBusStopName', 'setSelectedBusStopName', ''),
    withState('clickCoords', 'setClickCoords', {})
)(props => (
	<div>
	<GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -18.9127, lng: 47.49855 }}
    options={{ draggableCursor: 'crosshair' }}
    onClick={(e) => props.setClickCoords(e.latLng)}
	>
	{ props.stops.map((item, index) => <Marker key={index} position={{lat: item.location.lat, lng: item.location.lng}} title={item.name} />) }
    { props.stop.filter(item => item.display).map((item, index) => <Marker key={index} position={{lat: parseFloat(item.lat), lng: parseFloat(item.lng)}} title={item.name} />) }
    { !!props.clickCoords.lat && !!props.clickCoords.lng && <Marker position={{ lat: props.clickCoords.lat(), lng: props.clickCoords.lng() }}
      draggable={true}
      onDrag={(e) => props.setClickCoords(e.latLng)} /> }
    { props.ways.map((item, index) => <Polyline key={index} path={item} />) }
    </GoogleMap>
	<div className="grid-container">
	<div>{!!props.clickCoords.lat && props.clickCoords.lat()}, {!!props.clickCoords.lng && props.clickCoords.lng()}</div><div></div>
	<div>
	<h1>{props.selectedBusLineName}</h1>
	<LinesFilterForm setBusLineNameFilter={props.setBusLineNameFilter} />
	<Lines busLineNameFilter={props.busLineNameFilter} setSelectedBusLineName={props.setSelectedBusLineName} setStops={props.setStops} setWays={props.setWays} />
	</div>
	<div>
	<h1>{props.selectedBusStopName}</h1>
	<StopsFilterForm setBusStopNameFilter={props.setBusStopNameFilter} />
	<Stops busStopNameFilter={props.busStopNameFilter} setSelectedBusStopName={props.setSelectedBusStopName} setBusStops={props.setBusStops} />
	</div>
	</div>
	</div>
));

class Lines extends React.Component {
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
	    .then(response => response.json().then(data => this.props.setStops(() => data)))
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

class Stops extends React.Component {
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
	    }).map((item, index) => <li key={index} onClick={() => this.handleClick(item.id)}>{ item.name } <span>{ item.display ? 'd': '' }</span></li>)
	}
	</ul>
    }
}

class LinesFilterForm extends React.Component {
    
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

class StopsFilterForm extends React.Component {
    
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

const App = () => <MyMapComponent />

ReactDOM.render(<App />, document.getElementById("root"));

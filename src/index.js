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
    withState('ways', 'setWays', []),
    withState('busLineNameFilter', 'setBusLineNameFilter', ''),
    withState('selectedBusLineName', 'setSelectedBusLineName', '')
)(props => (
	<div>
	<h1>{props.selectedBusLineName}</h1>
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -18.9127, lng: 47.49855 }}>
	{ props.stops.map((item, index) => <Marker key={index} position={{lat: item.location.lat, lng: item.location.lng}} title={item.name} />) }
    { props.ways.map((item, index) => <Polyline key={index} path={item} />) }
	</GoogleMap>
	<FilterForm setBusLineNameFilter={props.setBusLineNameFilter} />
	<Stop busLineNameFilter={props.busLineNameFilter} setSelectedBusLineName={props.setSelectedBusLineName} setStops={props.setStops} setWays={props.setWays} />
	</div>
));

class Stop extends React.Component {
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

class FilterForm extends React.Component {
  handleChange = (e) => {
      this.props.setBusLineNameFilter(e.target.value)
  }
  
  render() {
      return <div>
          <label htmlFor="filter">Filter by Bus Line Name: </label>
          <input type="text" id="filter"
      onChange={this.handleChange}/>
	  </div>
  }
}

const App = () => <MyMapComponent />

ReactDOM.render(<App />, document.getElementById("root"));

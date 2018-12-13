import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap
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
  withGoogleMap
)(props => (
	<GoogleMap defaultZoom={8} defaultCenter={{ lat: -18.9127, lng: 47.49855 }}>
	</GoogleMap>
));

class Stop extends React.Component {
    constructor() {
	super()
	this.state = {items: []}
    }
    componentDidMount () {
	
	fetch('http://localhost:2999/lines')
	    .then(response => response.json().then(data => this.setState({ items: data })))
	    .catch(error => console.log(error));
    }
    render () {
	return <ul> {
	    this.state.items.map((item, index) => <li key={index}>{ item }</li>)
	}
	</ul>
    }
}

const App = () =>
      <div>
      <MyMapComponent />
      <Stop />
      </div>

ReactDOM.render(<App />, document.getElementById("root"));

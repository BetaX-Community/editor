import React from "react";
import ReactDOM from "react-dom";
import { compose, withProps, withState } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polyline,
} from "react-google-maps";

import Lines from "./lines";
import LinesFilterForm from "./lines-filter-form";
import Stops from "./stops";
import StopsFilterForm from "./stops-filter-form";
import BusStopList from "./bus-stop-list";

const gmaps_api_key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${gmaps_api_key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  withState("stops", "setStops", []),
  withState("stop", "setBusStops", []),
  withState("ways", "setWays", []),
  withState("busLineNameFilter", "setBusLineNameFilter", ""),
  withState("busStopNameFilter", "setBusStopNameFilter", ""),
  withState("selectedBusLineName", "setSelectedBusLineName", ""),
  withState("selectedBusStopName", "setSelectedBusStopName", ""),
  withState("clickCoords", "setClickCoords", []),
)((props) => (
  <div>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -18.9127, lng: 47.49855 }}
      options={{ draggableCursor: "crosshair" }}
      onClick={(e) =>
        props.setClickCoords((clickCoords) => [...clickCoords, e.latLng])
      }
    >
      {props.stops.map(
        (item, index) =>
          item.display && (
            <Marker
              key={index}
              position={{ lat: item.location.lat, lng: item.location.lng }}
              title={item.name}
            />
          ),
      )}
      {props.stop
        .filter((item) => item.display)
        .map((item, index) => (
          <Marker
            key={index}
            position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
            title={item.name}
          />
        ))}
      {props.clickCoords.length > 0 &&
        props.clickCoords.map((item, index) => (
          <Marker
            key={index}
            position={{ lat: item.lat(), lng: item.lng() }}
            draggable={true}
            onDrag={(e) =>
              props.setClickCoords((clickCoords) => [
                ...clickCoords.slice(0, index),
                e.latLng,
                ...clickCoords.slice(index + 1),
              ])
            }
          />
        ))}
      {props.ways.map((item, index) => (
        <Polyline key={index} path={item} />
      ))}
    </GoogleMap>
    <div className="grid-container">
      <div>
        <BusStopList
          stops={props.stops}
          clickCoords={props.clickCoords}
          setStops={props.setStops}
        />
      </div>
      <div></div>
      <div>
        <h1>{props.selectedBusLineName}</h1>
        <LinesFilterForm setBusLineNameFilter={props.setBusLineNameFilter} />
        <Lines
          busLineNameFilter={props.busLineNameFilter}
          setSelectedBusLineName={props.setSelectedBusLineName}
          setStops={props.setStops}
          setWays={props.setWays}
        />
      </div>
      <div>
        <h1>{props.selectedBusStopName}</h1>
        <StopsFilterForm setBusStopNameFilter={props.setBusStopNameFilter} />
        <Stops
          busStopNameFilter={props.busStopNameFilter}
          setSelectedBusStopName={props.setSelectedBusStopName}
          setBusStops={props.setBusStops}
        />
      </div>
    </div>
  </div>
));

const App = () => <MyMapComponent />;

ReactDOM.render(<App />, document.getElementById("root"));

import './App.css'
import React, {useRef} from "react";
import Lines from './Lines.tsx';
import LinesFilterForm from './LinesFilterForm.tsx';
import { GoogleMap, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const center = {
  lat: -18.9127,
  lng: 47.49855
};

function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [busLineNameFilter, setBusLineNameFilter] = React.useState('');
  const [selectedBusLineName, setSelectedBusLineName] = React.useState('');
  const [stops, setStops] = React.useState([]);
  const polylines = useRef([]);
  const [ways, setWays] = React.useState([]);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setWays(polylines.current);
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  return isLoaded ? (
      <>
      <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={8}
    onLoad={onLoad}
    onUnmount={onUnmount}
      >
      { stops.map((item, index) => item.display && <Marker key={index} position={{lat: item.location.lat, lng: item.location.lng}} title={item.name} />) }
      { ways.map((item, index) => <Polyline key={index} path={item} />) }
    </GoogleMap>
      
      <h1>{selectedBusLineName}</h1>
      <LinesFilterForm setBusLineNameFilter={setBusLineNameFilter} />
      <Lines busLineNameFilter={busLineNameFilter}
             setSelectedBusLineName={setSelectedBusLineName}
             setStops={setStops}
             setWays={setWays}
             polylines={polylines} />
      </>
  ) : <></>
}

export default App

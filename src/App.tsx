import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {Polyline} from './components/polyline.tsx';
import { BusLineStops, Stops, Lines } from "./components";
import { useMap } from "./contexts/map";

const containerStyle = {
  width: "640px",
  height: "480px",
};

const center = {
  lat: -18.9127,
  lng: 47.49855
};

const App = () => {

  const {busStops, stops, selectedLine, ways}: {busStops: BusStopData[],
                                                stops: MapBusStopData[],
                                                selectedLine?: string,
                                                ways: google.maps.LatLng[][]} = useMap();

  return (
      <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
      <div className="grid-container">
      <Map
    style={containerStyle}
    defaultCenter={center}
    defaultZoom={10}
      >
      { busStops.map((busStop: BusStopData, index: number) =>
                     <Marker key={index}
                     position={{"lat": parseFloat(busStop.lat),
                                "lng": parseFloat(busStop.lng)}}
                     title={busStop.name} />) }
      { stops.map((stop, index) => <Marker key={index} position={stop.location}
                  title={(stop.name === "" ? stop.location.lat + ',' + stop.location.lng : stop.name)} />) }
    { ways.map((path, index) => <Polyline key={index} path={path} />) }
    </Map>
      <div>
      <BusLineStops busLine={selectedLine} stops={stops} />
      </div>
      </div>
      </APIProvider>
      <div className="grid-container">
      <div>
      <Stops />
      </div>
      <div>
      <Lines />
      </div>
      </div>
      </>
  );
};

export default App;

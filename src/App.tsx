import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {Polyline} from './components/polyline.tsx';
import { Stops, Lines } from "./components";
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

  const {stops, ways} = useMap();
  
  return (
      <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}>
      <Map
    style={containerStyle}
    defaultCenter={center}
    defaultZoom={10}
      >
      { stops.map((stop, index) => <Marker key={index} position={stop.location} title={stop.name} />) }
    { ways.map((path, index) => <Polyline key={index} path={path} />) }
    </Map>
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

import { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Stops, Lines } from "./components";
// import { useMap } from "./contexts/map";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -18.525,
  lng: 47.9,
};

const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // const { stops, ways } = useMap();

  const mapRef = useRef<google.maps.Map | null>();

  const onLoad = (map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    mapRef.current = map;
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  return (
    isLoaded && (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {/* TODO: markers, polylines, etc */}
        </GoogleMap>
        <div className="grid-container">
          <div>
            <Stops />
          </div>
          <div>
            <Lines />
          </div>
        </div>
      </>
    )
  );
};

export default App;

import { createContext, useContext, useState } from "react";

type MapContextData = {
  busStops: BusStopData[];
  setBusStops: (busStops: BusStopData[]) => void;
  ways: google.maps.LatLng[][];
  setWays: (stop: google.maps.LatLng[][]) => void;
  stops: MapBusStopData[];
  setStops: (stop: MapBusStopData[]) => void;
  selectedLine?: string;
  setSelectedLine: (line: string) => void;
};

const MapContext = createContext({} as MapContextData);

const useMap = () => useContext(MapContext);

const MapContextProvider = (props: { children: React.ReactNode }) => {
  const [busStops, setBusStops] = useState<BusStopData[]>([]);
  const [stops, setStops] = useState<MapBusStopData[]>([]);
  const [ways, setWays] = useState<google.maps.LatLng[][]>([]);
  const [selectedLine, setSelectedLine] = useState<string>();

  const contextValue = {
    busStops,
    setBusStops,
    ways,
    setWays,
    stops,
    setStops,
    selectedLine,
    setSelectedLine,
  };

  return (
    <MapContext.Provider value={contextValue}>
      {props.children}
    </MapContext.Provider>
  );
};

export { useMap, MapContextProvider };

import { createContext, useContext, useState } from "react";

type MapContextData = {
  ways: Way[];
  setWays: (stop: Way[]) => void;
  stops: BusStopData[];
  setStops: (stop: BusStopData[]) => void;
  selectedLine?: string;
  setSelectedLine: (line: string) => void;
};

const MapContext = createContext({} as MapContextData);

const useMap = () => useContext(MapContext);

const MapContextProvider = (props: { children: React.ReactNode }) => {
  const [busStops, setBusStops] = useState<BusStopData[]>([]);
  const [stops, setStops] = useState<BusStopData[]>([]);
  const [ways, setWays] = useState<Way[]>([]);
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

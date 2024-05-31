// FIXME: just a placeholder, maybe should use builtin type for Polyline?
type Way = {
  lat: number;
  lng: number;
};

type BusStopData = {
  lat: string;
  lng: string;
  name: string;
};

type Coordinates = {
  lat: number;
  lng: number;
};

type MapBusStopData = {
  location: Coordinates;
  name: string;
};

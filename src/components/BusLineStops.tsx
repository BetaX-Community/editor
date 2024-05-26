interface IBusLinesStops {
  busLine?: string;
  stops: MapBusStopData[];
}

const BusLineStops = ({ busLine, stops }: IBusLinesStops) => {
  return (
    <div>
      <h2>Stops for Bus Line {busLine}</h2>
      <ul>
        {stops.map((stop, index) => (
          <li key={index}>{(stop.name === "" ? stop.location.lat + ',' + stop.location.lng : stop.name)}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusLineStops;

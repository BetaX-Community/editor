import React from 'react';

const BusLineStops = ({ busLine, stops }) => {
  return (
    <div>
      <h2>Stops for Bus Line {busLine}</h2>
      <ul>
        {stops.map((stop, index) => (
          <li key={index}>{stop.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BusLineStops;

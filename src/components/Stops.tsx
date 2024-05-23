import { useEffect, useState } from "react";
import { useMap } from "../contexts/map";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(faCheck);

const Stops = () => {
  const [filter, setFilter] = useState("");
  const [values, setValues] = useState<BusStopData[]>([]);

  const {busStops, setBusStops} = useMap();

  const fetchBusStops = async () => {
    const res = await fetch(`${import.meta.env.VITE_MAP_DATA_SERVER_URL}busStops`);
    const parsed = await res.json();
    setValues(parsed);
  };

  const handleClick = (event) => {
    // Retrieve custom data attributes for bus stop name, latitude and longitude
    const stopName = event.target.dataset.stopName;
    const lat = event.target.dataset.lat;
    const lng = event.target.dataset.lng;
    const isDisplayed = busStops.find((item) => item.name === stopName && item.lat == lat && item.lng == lng);

    // If displayed, remove from the displayed bus stops
    if (isDisplayed) {
      setBusStops(busStops.filter((item) => item.name !== stopName || item.lat != lat || item.lng != lng));
    }
    else { // else display
      setBusStops([...busStops, {"name": stopName,
                                 "lat": parseFloat(lat),
                                 "lng": parseFloat(lng)}]);
    }
  };

  useEffect(() => {
    fetchBusStops();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="stop-name-filter">Filter by bus stop name: </label>
        <input
          type="text"
          id="stop-name-filter"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ul>
        {values
          .filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((item, id) => (
            <li key={id}
            data-stop-name={item.name}
            data-lat={item.lat} data-lng={item.lng}
            onClick={handleClick}>{item.name} { busStops.find(it => it.name === item.name &&
                                                              it.lat == item.lat && it.lng == item.lng) &&
                                                <FontAwesomeIcon icon="check" /> }</li>
          ))}
      </ul>
    </>
  );
};

export default Stops;

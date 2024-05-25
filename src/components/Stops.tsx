import { useEffect, useState } from "react";

const Stops = () => {
  const [filter, setFilter] = useState("");
  const [values, setValues] = useState<BusStopData[]>([]);

  const fetchBusStops = async () => {
    const res = await fetch(`${import.meta.env.VITE_MAP_DATA_SERVER_URL}busStops`);
    const parsed = await res.json();
    setValues(parsed);
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
            <li key={id}>{item.name}</li>
          ))}
      </ul>
    </>
  );
};

export default Stops;

import { useEffect, useState } from "react";
import { useMap } from "../contexts/map";

const Lines = () => {
  const [filter, setFilter] = useState("");
  const [values, setValues] = useState<string[]>([]);
  const { setSelectedLine, setStops, setWays } = useMap();

  const fetchBusLines = async () => {
    const res = await fetch("http://localhost:2999/lines");
    const parsed: string[] = await res.json();
    setValues(parsed);
  };

  const onLineSelect = async (name: string) => {
    const [stopsRes, waysRes] = await Promise.all([
      fetch(`http://localhost:2999/stops/${name}`),
      fetch(`http://localhost:2999/ways/${name}`),
    ]);
    const [stops, ways] = await Promise.all([stopsRes.json(), waysRes.json()]);

    setStops(stops);
    setWays(ways);
    setSelectedLine(name);
  };

  useEffect(() => {
    fetchBusLines();
  }, []);

  return (
    <>
      <div>
        <label htmlFor="line-name-filter">Filter by bus line name: </label>
        <input
          type="text"
          id="line-name-filter"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ul>
        {values
          .filter((item) => item.toLowerCase().includes(filter.toLowerCase()))
          .map((name, id) => (
            <li key={id} onClick={() => onLineSelect(name)}>
              {name}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Lines;

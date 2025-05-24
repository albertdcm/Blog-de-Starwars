import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getData = async (type) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}`);
      const data = await res.json();
      if (type === "people") dispatch({ type: "set_characters", payload: data.results });
      if (type === "vehicles") dispatch({ type: "set_vehicles", payload: data.results });
      if (type === "planets") dispatch({ type: "set_planets", payload: data.results });
    } catch (err) {
      console.error(`Error loading ${type}:`, err);
    }
  };

  useEffect(() => {
    getData("people");
    getData("vehicles");
    getData("planets");
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-danger mb-3">Characters</h2>
      <div className="d-flex overflow-auto">
        {store.characters.map((c) => (
          <Card key={c.uid} name={c.name} uid={c.uid} type="people" />
        ))}
      </div>

      <h2 className="text-primary mt-5 mb-3">Vehicles</h2>
      <div className="d-flex overflow-auto">
        {store.vehicles.map((v) => (
          <Card key={v.uid} name={v.name} uid={v.uid} type="vehicles" />
        ))}
      </div>

      <h2 className="text-success mt-5 mb-3">Planets</h2>
      <div className="d-flex overflow-auto">
        {store.planets.map((p) => (
          <Card key={p.uid} name={p.name} uid={p.uid} type="planets" />
        ))}
      </div>
    </div>
  );
};
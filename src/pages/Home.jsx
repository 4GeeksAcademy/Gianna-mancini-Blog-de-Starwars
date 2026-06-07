import { useEffect, useState } from "react";
import { ItemCard } from "../components/ItemCard";

export const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]); 
  const [loading, setloading] = useState(true);

  const getItemsDetails = async (type) => {
    const response = await fetch(`https://www.swapi.tech/api/${type}`);
    const data = await response.json();

    const details = await Promise.all(
      data.results.map(async (item) => {
        const detailResponse = await fetch(item.url);
        const detailData = await detailResponse.json();

        return {
          uid: item.uid,
          name: item.name,
          ...detailData.result.properties,
        };
      })
    );

    return details;
  };

  const getData = async () => {
    const charactersData = await getItemsDetails("people");
    const planetsData = await getItemsDetails("planets");
    const vehiclesData = await getItemsDetails("vehicles");

    setCharacters(charactersData);
    setPlanets(planetsData);
    setVehicles(vehiclesData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-danger mb-4">Characters</h1>
      <div className="d-flex gap-4 overflow-auto pb-3">
        {characters.map((character) => (
          <ItemCard key={character.uid} item={character} type="people" />
        ))}
      </div>

      <h1 className="text-danger my-4">Planets</h1>
      <div className="d-flex gap-4 overflow-auto pb-3">
        {planets.map((planet) => (
          <ItemCard key={planet.uid} item={planet} type="planets"/>
        ))}
      </div> 

      <h1 className="text-danger my-4">Vehicles</h1>
      <div className="d-flex gap-4 overflow-auto pb-3">
        {vehicles.map((vehicle) => (
          <ItemCard key={vehicle.uid} item={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};
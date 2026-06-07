import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Single = () => {
  const { type, id } = useParams();

  const [item, setItem] = useState(null);
  const [description, setDescription] = useState("");

  const getDetails = async () => {
    const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
    const data = await response.json();

    setItem(data.result.properties);
    setDescription(data.result.description);
  };

  useEffect(() => {
    getDetails();
  }, [type, id]);

  if (!item) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  const detailsByType = {
    people: [
      ["Name", item.name],
      ["Birth Year", item.birth_year],
      ["Gender", item.gender],
      ["Height", item.height],
      ["Skin Color", item.skin_color],
      ["Eye Color", item.eye_color],
    ],

    planets: [
      ["Name", item.name],
      ["Climate", item.climate],
      ["Population", item.population],
      ["Terrain", item.terrain],
      ["Gravity", item.gravity],
      ["Diameter", item.diameter],
    ],

    vehicles: [
      ["Name", item.name],
      ["Model", item.model],
      ["Manufacturer", item.manufacturer],
      ["Cost", item.cost_in_credits],
      ["Passengers", item.passengers],
      ["Class", item.vehicle_class],
    ],
  };

  const detailsToShow = detailsByType[type] || [];

  return (
    <div className="container my-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <img
            src="https://placehold.co/600x400?text=Star+Wars"
            className="img-fluid"
            alt={item.name}
            style={{ height: "350px", width: "100%", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-6 text-center">
          <h1>{item.name}</h1>
          <p>{description}</p>
        </div>
      </div>

      <hr className="border border-danger" />

      <div className="row text-danger text-center">
        {detailsToShow.map(([label, value]) => (
          <div className="col" key={label}>
            <h6>{label}</h6>
            <p>{value || "n/a"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const ItemCard = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();

  const imageType = type === "people" ? "characters" : type;

  const isFavorite = store.favorites.some(
    (favorite) => favorite.uid === item.uid && favorite.type === type
  );  

  const toggleFavorite = () => {
    dispatch({
      type: isFavorite ? "remove_favorite" : "add_favorite",
      payload: {
        name: item.name,
        uid: item.uid,
        type: type,
      },
    });
  };

  return (
    <div className="card h-100" style={{ minWidth: "18rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/${imageType}/${item.uid}.jpg`}
        className="card-img-top"
        alt={item.name}
        style={{ height: "180px", objectFit: "cover" }}
        onError={(event) => {
          event.currentTarget.src = "https://placehold.co/400x200?text=Star+Wars";
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>

        {type === "people" && (
          <>
            <p className="mb-0">Gender: {item.gender || "n/a"}</p>
            <p className="mb-0">Hair Color: {item.hair_color || "n/a"}</p>
            <p>Eye Color: {item.eye_color || "n/a"}</p>
          </>
        )}

        {type === "planets" && (
          <>
            <p className="mb-0">Climate: {item.climate || "n/a"}</p>
            <p className="mb-0">Terrain: {item.terrain || "n/a"}</p>
            <p>Population: {item.population || "n/a"}</p>
          </>
        )}

        {type === "vehicles" && (
          <>
            <p className="mb-0">Model: {item.model || "n/a"}</p>
            <p className="mb-0">Manufacturer: {item.manufacturer || "n/a"}</p>
            <p>Class: {item.vehicle_class || "n/a"}</p>
          </>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3">
          <Link
            to={`/single/${type}/${item.uid}`}
            className="btn btn-outline-primary"
          >Learn more!</Link>

          <button
            className={isFavorite ? "btn btn-warning" : "btn btn-outline-warning"}
            onClick={toggleFavorite}> 
            <i className={isFavorite ? "fa-regular fa-heart" : "fa-regular fa-heart"}></i> 
          </button>
        </div>
      </div>
    </div>
  );
};
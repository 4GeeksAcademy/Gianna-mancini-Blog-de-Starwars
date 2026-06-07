import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (favorite) => {
    dispatch({
      type: "remove_favorite", 
      payload: favorite,
    });
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand text-decoration-none">
         <img
            src="https://www.freepnglogos.com/uploads/star-wars-logo-design-21.png"
            alt="Star Wars Logo"
            style={{ width: "70px" }}/>
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"> Favorites {store.favorites.length}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li>
                <span className="dropdown-item text-muted">empty</span>
              </li>
            ) : (
              store.favorites.map((favorite) => (
                <li
                  key={`${favorite.type}-${favorite.uid}`}
                  className="dropdown-item d-flex justify-content-between align-items-center">
                  <Link
                    to={`/single/${favorite.type}/${favorite.uid}`}
                    className="text-decoration-none text-dark">
                    {favorite.name}
                  </Link>

                 <span
                  className="text-dark ms-3"
                  role="button"
                  onClick={() => removeFavorite(favorite)}>
                  <i className="fa-solid fa-trash-can"></i>
                </span>
                </li>
              ))
            )} 
          </ul> 
        </div>
      </div>
    </nav>
  );
};


	
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const handleRemove = (item) => {
    dispatch({ type: "remove_favorite", payload: item });
  };

  return (
    <nav className="navbar navbar-light bg-light px-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254/" height={40} alt="Star Wars" />
        </Link>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites <span className="badge bg-light text-dark">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li><span className="dropdown-item text-muted">No favorites</span></li>
            ) : (
              store.favorites.map((item, index) => (
                <li key={index} className="d-flex justify-content-between align-items-center">
                  <Link className="dropdown-item" to={`/single/${item}`}>
                    {item.split("/")[1]}
                  </Link>
                  <button
                    onClick={() => handleRemove(item)}
                    className="btn btn-sm text-danger"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
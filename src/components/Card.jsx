import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Card = ({ name, uid, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const isFav = store.favorites.includes(`${type}/${uid}`);

  const handleFavorite = () => {
    if (isFav) {
      dispatch({ type: "remove_favorite", payload: `${type}/${uid}` });
    } else {
      dispatch({ type: "add_favorite", payload: `${type}/${uid}` });
    }
  };

  return (
    <div className="card m-2" style={{ width: "18rem" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`}
        className="card-img-top"
        alt={name}
        onError={e => e.target.style.display = "none"}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <Link to={`/single/${type}/${uid}`} className="btn btn-outline-primary">
          Learn more!
        </Link>
        <button onClick={handleFavorite} className="btn btn-outline-warning ms-2">
          <i className={isFav ? "fas fa-heart" : "far fa-heart"}></i>
        </button>
      </div>
    </div>
  );
};

export default Card;
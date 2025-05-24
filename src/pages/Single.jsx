import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);

  const getDetails = async () => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const result = await res.json();
      setData(result.result);
    } catch (err) {
      console.error("Error loading detail:", err);
    }
  };

  useEffect(() => {
    getDetails();
  }, [type, uid]);

  return (
    <div className="container mt-4 text-center">
      {data ? (
        <>
          <h1 className="display-4">{data.properties.name}</h1>
          <img
            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${uid}.jpg`}
            onError={e => (e.target.style.display = "none")}
            className="img-fluid my-3"
            alt={data.properties.name}
          />
          <div className="row">
            {Object.entries(data.properties).map(([key, value]) => (
              <div className="col-md-4" key={key}>
                <h5 className="text-uppercase">{key.replace("_", " ")}</h5>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <Link to="/" className="btn btn-secondary mt-4">
            Back Home
          </Link>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get(`${API_URL}/galleries/all-galleries`);
        setGalleries(response.data);
      } catch (error) {
        error.response?.data?.errorMessage || error.message;
        setError("Oops! Something went wrong. Please try again later!");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="gallery-list-container">
      <h1>Gallery List</h1>
      <div className="gallery-list">
        {galleries.map((gallery) => (
          <Link
            to={`/galleries/${gallery._id}`}
            key={gallery._id}
            className="gallery-item"
          >
            <div>
              <h2>{gallery.name}</h2>
              {gallery.image && <img src={gallery.image} alt={gallery.name} />}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

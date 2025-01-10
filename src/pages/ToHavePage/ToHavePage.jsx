import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ToHavePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/favorites`);
        setFavorites(data);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  if (favorites.length === 0) {
    return <p>No favorites yet!</p>;
  }

  return (
    <div className="favorites-list">
      <h2>Your Favorite Galleries</h2>
      {favorites.map((gallery) => (
        <div key={gallery._id} className="favorite-item">
          <h3>{gallery.name}</h3>
          <p>{gallery.description}</p>
          {gallery.images && gallery.images.length > 0 && (
            <img src={gallery.images[0]} alt={gallery.name} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ToHavePage;

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./HomePage.css";

const API_URL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredGallery, setHoveredGallery] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/galleries/all-galleries`);
        setGalleries(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const handleMouseEnter = (galleryId) => {
    setHoveredGallery(galleryId);
  };

  const handleMouseLeave = () => {
    setHoveredGallery(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="gallery-list-container">
      <div className="gallery-list">
        {galleries.map((oneGallery) => (
          <Link
            to={`/galleries/${oneGallery._id}`}
            key={oneGallery._id}
            className="gallery-item"
            onMouseEnter={() => handleMouseEnter(oneGallery._id)}
            onMouseLeave={handleMouseLeave}
          >
            <div>
              <h2>{oneGallery.name}</h2>
              {hoveredGallery === oneGallery._id &&
                oneGallery.images &&
                oneGallery.images.length > 0 && (
                  <img
                    src={oneGallery.images[0]}
                    alt={oneGallery.name}
                    style={{
                      opacity: 1,
                      transition: "opacity 0.3s",
                    }}
                  />
                )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

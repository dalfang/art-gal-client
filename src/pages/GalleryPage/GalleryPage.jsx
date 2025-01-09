import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const GalleryPage = () => {
  const { id } = useParams();
  const [oneGallery, setGallery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleryDetails = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/galleries/one-gallery/${id}`
        );
        setGallery(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGalleryDetails();
  }, [id]);

  if (!oneGallery) {
    return <p>Loading gallery details...</p>;
  }

  return (
    <div className="gallery-details">
      <h2>{oneGallery.name}</h2>
      <p> {oneGallery.description}</p>
      {oneGallery.images && oneGallery.images.length > 0 && (
        <img src={oneGallery.images[0]} alt={oneGallery.name} />
      )}
      <button onClick={() => navigate("/")}>Back to Galleries</button>
    </div>
  );
};

export default GalleryPage;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const GalleryDetailsPage = () => {
  const { id } = useParams();
  const [oneGallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleryDetails = async () => {
      try {
        // Fetch the gallery details based on the gallery ID
        const { data } = await axios.get(
          `${API_URL}/galleries/one-gallery/${id}`
        );
        setGallery(data);
      } catch (error) {
        setError("Oops! Something went wrong. Please try again later!");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!gallery) {
    return <p>Gallery not found!</p>;
  }

  return (
    <div className="gallery-details">
      <h2>{oneGallery.name}</h2>
      <p>Description: {oneGallery.description}</p>
      {/* If gallery has an image, display it */}
      {oneGallery.images && (
        <img
          src={`${API_URL}/images/${oneGallery.images}`}
          alt={oneGallery.name}
        />
      )}
      <button onClick={() => navigate("/galleries")}></button>
    </div>
  );
};

export default GalleryDetailsPage;

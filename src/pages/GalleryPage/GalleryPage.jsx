import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

const GalleryPage = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [oneGallery, setGallery] = useState(null);
  const [selectedSize, setSelectedSize] = useState("20*30");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleryDetails = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/galleries/one-gallery/${id}`
        );
        setGallery(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGalleryDetails();
  }, [id]);

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleAddFavorite = async () => {
    try {
      if (!currentUser) {
        alert("Please log in to add to favorites!");
        return;
      }

      const favoriteData = {
        user: currentUser?._id,
        gallery: oneGallery?._id,
      };

      await axios.post(`${API_URL}/favorites`, favoriteData);
      alert("Added to favorites!");
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        user: currentUser?._id,
        drawing: oneGallery?._id,
        product: selectedSize,
        price: calculatePrice(selectedSize),
      };
      const { data } = await axios.post(`${API_URL}/orders`, orderData);
      //alert("Order successfully placed!");
      navigate(`/tohave/${data._id}`);
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const calculatePrice = (size) => {
    switch (size) {
      case "20*30":
        return 20;
      case "30*40":
        return 30;
      case "40*60":
        return 40;
      case "50*70":
        return 50;
      default:
        return 0;
    }
  };

  if (!oneGallery) {
    return <p>Loading gallery details...</p>;
  }

  return (
    <div className="gallery-details">
      <h2>{oneGallery.name}</h2>
      <p>{oneGallery.description}</p>
      {oneGallery.images && oneGallery.images.length > 0 && (
        <img
          src={oneGallery.images[0]}
          alt={oneGallery.name}
          className="gallery-image"
        />
      )}
      <form onSubmit={handlePreview} className="order-form">
        <Box sx={{ minWidth: 120, maxWidth: 300 }}>
          <FormControl fullWidth>
            <InputLabel id="size-select-label">Print Size</InputLabel>
            <Select
              labelId="size-select-label"
              id="size-select"
              value={selectedSize}
              label="Print Size"
              onChange={handleSizeChange}
            >
              <MenuItem value={"20*30"}>20*30</MenuItem>
              <MenuItem value={"30*40"}>30*40</MenuItem>
              <MenuItem value={"40*60"}>40*60</MenuItem>
              <MenuItem value={"50*70"}>50*70</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div className="price-display">
          <h3>Product price: €{calculatePrice(selectedSize)}</h3>
        </div>
        <button type="submit" className="submit-button">
          Order now!
        </button>
      </form>
      <button onClick={handleAddFavorite} className="favorite-button">
        Add to Favorites
      </button>

      <button onClick={() => navigate("/")} className="back-button">
        Back to Galleries
      </button>
    </div>
  );
};

export default GalleryPage;

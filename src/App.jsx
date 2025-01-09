import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage/SignupPage";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import Footer from "./components/Footer/Footer";
import GalleryPage from "./pages/GalleryPage/GalleryPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/galleries/:id" element={<GalleryPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

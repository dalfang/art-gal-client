import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse enter and leave events to toggle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <h1>Sore Eyes Zone</h1>
        </Link>

        <div
          className="tohavepage-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button>ToHavePage</button>

          {/* Show the buttons only when hovered */}
          {isHovered && (
            <div className="dropdown">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

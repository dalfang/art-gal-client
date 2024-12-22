import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <h1>Sore Eyes Zone</h1>
        </Link>

        <div className="auth-buttons">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

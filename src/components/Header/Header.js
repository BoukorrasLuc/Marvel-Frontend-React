// Scss
import "./Header.scss";

// Packages
import { Link } from "react-router-dom";

// Import image
import header from "../../assets/images/M1.jpg";

const Header = ({ setUser, userToken, toggleModaleLogin }) => {
  return (
    <header>
      <Link to="/">
        <img className="img1" src={header} alt="Super héros Marvel" />
      </Link>

      <Link
        className="p-comics"
        to="/comics"
        style={{ textDecoration: "none" }}
      >
        <div>Comics</div>
      </Link>
      <Link
        className="p-characters"
        to="/characters"
        style={{ textDecoration: "none" }}
      >
        <div>Personnages</div>
      </Link>

      <Link
        className="p-favoris"
        to="/Favoris"
        style={{ textDecoration: "none" }}
      >
        <div>Favoris</div>
      </Link>

      {userToken ? null : (
        <div className="p-favoris" onClick={toggleModaleLogin}>
          <div>Login</div>
        </div>
      )}

      {userToken ? (
        <div
          className="p-favoris"
          onClick={() => {
            setUser(null);
          }}
        >
          <div>Logout</div>
        </div>
      ) : null}

      <Link to="/">
        <img className="img2" src={header} alt="Super héros Marvel" />
      </Link>
    </header>
  );
};

export default Header;

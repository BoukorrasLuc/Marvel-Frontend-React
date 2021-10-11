import "./Header.scss";

// packages
import { Link } from "react-router-dom";

// Import image
import header from "../../assets/images/M1.jpg";

const Header = () => {
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
      <Link to="/">
        <img className="img2" src={header} alt="Super héros Marvel" />
      </Link>
    </header>
  );
};

export default Header;

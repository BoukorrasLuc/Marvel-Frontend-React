//Import image Hearder
import header from "../assets/images/M1.jpg";

//J'utilise Link pour lier des liens vers des pages.
import { Link } from "react-router-dom";

//Je recupere la state qui est dans App.js pour connaitre les infos dans le header.
const Header = ({ setUser, userToken }) => {
  return (
    <header>
      <Link to="/">
        <img src={header} alt="Super héros Marvel" />
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

      <div className="b-header">
        {userToken ? (
          // Si userToken est true , les données de la fonction sont supprimés
          <div className="b-deconnecter" onClick={() => setUser(null)}>
            Se déconnecter
          </div>
        ) : (
          <>
            <Link
              className="b-connecter"
              to="/login"
              style={{ textDecoration: "none" }}
            >
              Se connecter
            </Link>
            <Link className="b-inscrire" to="/signup">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

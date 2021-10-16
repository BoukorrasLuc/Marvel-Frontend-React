// Scss
import "./Header.scss";

// Packages
import { Link } from "react-router-dom";

// Modales
import ModaleLogin from "../../containers/Modales/ModaleLogin/ModaleLogin";
import ModaleSignUp from "../../containers/Modales/ModaleSignUp/ModaleSignUp";

// Import image
import header from "../../assets/images/M1.jpg";

const Header = ({
  setUser,
  setUserAccount,
  userToken,
  toggleModaleLogin,
  reveleModaleLogin,
  changeReveleModaleLogin,
  toggleModaleSignUp,
  reveleModaleSignUp,
  changeReveleModaleSignUp,
}) => {
  return (
    <header>
      <div className="containerLink">
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

        {userToken ? null : (
          <div>
            <div className="p-favoris" onClick={toggleModaleSignUp}>
              <div>SignUp/</div>
            </div>

            <div className="p-favoris" onClick={toggleModaleLogin}>
              <div>/Login</div>
            </div>
          </div>
        )}

        {userToken ? (
          <Link
            className="p-favoris"
            to="/Favoris"
            style={{ textDecoration: "none" }}
          >
            <div>Votre Compte</div>
          </Link>
        ) : null}

        <Link to="/">
          <img className="img2" src={header} alt="Super héros Marvel" />
        </Link>
      </div>

      <div className="modales">
        <ModaleLogin
          reveleModaleLogin={reveleModaleLogin}
          toggleModaleLogin={toggleModaleLogin}
          changeReveleModaleLogin={changeReveleModaleLogin}
          setUser={setUser}
          setUserAccount={setUserAccount}
        />

        <ModaleSignUp
          reveleModaleSignUp={reveleModaleSignUp}
          toggleModaleSignUp={toggleModaleSignUp}
          changeReveleModaleSignUp={changeReveleModaleSignUp}
          setUser={setUser}
        />
      </div>
    </header>
  );
};

export default Header;

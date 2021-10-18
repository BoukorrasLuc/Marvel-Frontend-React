// Scss
import "./App.scss";

// Packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Modales
import LogiqueModale from "./containers/Modales/LogiqueModale";

// Containers
import Home from "./containers/Home/Home";
import Comics from "./containers/Comics/Comics";
import Characters from "./containers/Characters/Characters";
import Favoris from "./containers/Favoris/Favoris";
import CharacterId from "./containers/CharacterId/CharacterId";

// Components
import Header from "./components/Header/Header";

// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight, faAngleLeft);

function App() {
  // state to store the errors to display.
  const [errorComics, setErrorComics] = useState("");
  const [errorCharacter, setErrorCharacter] = useState("");

  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userAccount, setUserAccount] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const {
    reveleModaleLogin,
    toggleModaleLogin,
    changeReveleModaleLogin,
    changeReveleModaleSignUp,
    reveleModaleSignUp,
    toggleModaleSignUp,
  } = LogiqueModale();

  return (
    <div>
      <Router>
        <Header
          userToken={userToken}
          setUser={setUser}
          setUserToken={setUserToken}
          setUserAccount={setUserAccount}
          reveleModaleLogin={reveleModaleLogin}
          toggleModaleLogin={toggleModaleLogin}
          changeReveleModaleLogin={changeReveleModaleLogin}
          reveleModaleSignUp={reveleModaleSignUp}
          toggleModaleSignUp={toggleModaleSignUp}
          changeReveleModaleSignUp={changeReveleModaleSignUp}
        />
        <Switch>
          <Route path="/comics/">
            <Comics
              userToken={userToken}
              toggleModaleSignUp={toggleModaleSignUp}
              toggleModaleLogin={toggleModaleLogin}
              reveleModaleLogin={reveleModaleLogin}
              changeReveleModaleLogin={changeReveleModaleLogin}
            />
          </Route>
          <Route path="/characters/">
            <Characters userToken={userToken} />
          </Route>
          <Route path="/character/:characterId">
            <CharacterId />
          </Route>
          <Route path="/favoris">
            <Favoris
              errorComics={errorComics}
              setErrorComics={setErrorComics}
              errorCharacter={errorCharacter}
              setErrorCharacter={setErrorCharacter}
              setUser={setUser}
              userToken={userToken}
              userAccount={userAccount}
            />
          </Route>
          <Route path="/">
            <Home
              setUserAccount={setUserAccount}
              setUserToken={setUserToken}
              setUser={setUser}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// scss
import "./App.scss";

// packages
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

// containers
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Characters from "./containers/Characters";
import Favoris from "./containers/Favoris";
import CharacterId from "./containers/CharacterId";

// components
import Header from "./components/Header";

// Import icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight, faAngleLeft);

function App() {
  // state to store the errors to display.
  const [errorComics, setErrorComics] = useState("");
  const [errorCharacter, setErrorCharacter] = useState("");

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route path="/comics/">
            <Comics />
          </Route>
          <Route path="/characters/">
            <Characters />
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
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

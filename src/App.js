import "./App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//containers
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Comics from "./containers/Comics";
import Characters from "./containers/Characters";

//components
import Header from "./components/Header";
import CharacterId from "./components/CharacterId";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight, faAngleLeft);

function App() {
  const [userToken, setUserToken] = useState();

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 1 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <div>
      <Router>
        <Header userToken={userToken} setUser={setUser} />
        <Switch>
          <Route path="/Signup">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login userToken={userToken} setUser={setUser} />
          </Route>
          <Route path="/comics/">
            <Comics />
          </Route>
          <Route path="/characters/">
            <Characters />
          </Route>
          <Route path="/character/:characterId">
            <CharacterId />
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

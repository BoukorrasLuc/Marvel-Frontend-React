// Scss
import "./ModaleSignUp.scss";

// Import Packages
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ModaleSignUp = ({
  setUser,
  reveleModaleSignUp,
  toggleModaleSignUp,
  changeReveleModaleSignUp,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  // we create a function which makes a request to create the user
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://marvel-backend-luc.herokuapp.com/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
        changeReveleModaleSignUp(!reveleModaleSignUp);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage("Cet email a déjà un compte chez nous !");
      }
    }
  };

  return (
    <div>
      {reveleModaleSignUp ? (
        <React.Fragment>
          <div className="overlayModaleSignUp">
            <div className="wrapperModaleSignUp">
              <div className="modaleModaleSignUp">
                <div className="modaleTop">
                  <h2>S'inscrire</h2>
                </div>

                {/* we create a form to retrieve the data we need for authentication */}

                <form onSubmit={handleSubmit} className="ballon">
                  <span className="tip"></span>
                  <div className="username">
                    <input
                      type="text"
                      placeholder="Nom d'utilisateur"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                  <div className="email">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorMessage("");
                      }}
                    />
                    <div className="email-error">{errorMessage}</div>
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      autoComplete="on"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  <button className="submit" type="submit">
                    Se connecter
                  </button>
                </form>
                <button
                  type="button"
                  className="close"
                  onClick={toggleModaleSignUp}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ModaleSignUp;

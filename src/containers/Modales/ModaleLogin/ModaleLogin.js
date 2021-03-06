// Scss
import "./ModaleLogin.scss";

// Import Packages
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ModaleLogin = ({
  setUser,
  setUserAccount,
  reveleModaleLogin,
  toggleModaleLogin,
  changeReveleModaleLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

  // We create a function which makes a request to find the user
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://marvel-backend-luc.herokuapp.com/user/login",

        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        setUserAccount(response.data);
        history.push("/");
        changeReveleModaleLogin(!reveleModaleLogin);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Mauvais email ou mot de passe");
      }
    }
  };

  return (
    <div>
      {reveleModaleLogin ? (
        <React.Fragment>
          <div className="overlayModaleLogin">
            <div className="wrapperModaleLogin">
              <div className="modaleModaleLogin">
                <div className="modaleTop">
                  <h2>To log in</h2>
                </div>

                {/* we create a form to retrieve the data we need for authentication */}

                <form onSubmit={onSubmit} className="ballon">
                  <span className="tip"></span>
                  <div className="email">
                    <input
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorMessage("");
                      }}
                      placeholder="E-mail"
                      type="email"
                    />
                  </div>
                  <div>
                    <input
                      onChange={(event) => setPassword(event.target.value)}
                      type="password"
                      placeholder="Password"
                      autoComplete="on"
                    />
                  </div>

                  <div>{errorMessage}</div>

                  <button className="submit" type="submit">
                    To log in
                  </button>
                </form>
                <button
                  type="button"
                  className="close"
                  onClick={toggleModaleLogin}
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

export default ModaleLogin;

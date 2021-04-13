import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const history = useHistory();

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
        console.log(response.data.token);
        history.push("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Mauvais email ou mot de passe");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="fond-form">
        <h2 className="title">Se connecter</h2>
        <form onSubmit={onSubmit}>
          <div className="email">
            <input
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
              }}
              placeholder="Adresse email"
              type="email"
            />
          </div>
          <div className="password">
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Mot de passe"
            />
          </div>

          <div className="login-error-message">{errorMessage}</div>

          <button type="submit">Se connecter</button>
        </form>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <span>
            Tu as déjà compte ? Connecte-toi, tu pourras mettre en favoris tes
            héros préférés !
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Login;

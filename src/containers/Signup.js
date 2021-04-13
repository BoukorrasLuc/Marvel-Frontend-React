import { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  // Renvoie une valeur avec état et une fonction pour la mettre à jour.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState();
  const [errorMessageUser, setErrorMessageUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

  // Le useHistory hook vous donne accès à l' historique instance que vous pouvez utiliser pour naviguer.
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //Empeche le rafraichissement de la page
      const response = await axios.post(
        "https://marvel-backend-luc.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          description: description,
          username: username,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        //Si création du user, on le renvoie vers la page /
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessageEmail("Cet email a déjà un compte chez nous !");
      }
      if (error.response.status === 403) {
        setErrorMessageUser("Ce Pseudo a déjà un compte chez nous !");
      }
      if (error.response.status === 401) {
        setErrorMessage("il manque des paramètres!");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="fond-form">
        <h2 className="title">S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <input
              type="username"
              placeholder="Pseudo"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setErrorMessageUser("");
              }}
            />
          </div>

          <div className="email">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessageEmail("");
              }}
            />
          </div>
          <div className="password">
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="description">
            <textarea
              type="textarea"
              placeholder="Description"
              MaxLength={80}
              rows={2}
              cols={50}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="email-error">{errorMessageEmail}</div>
          <div className="email-error">{errorMessage}</div>
          <div className="email-error">{errorMessageUser}</div>
          <button type="submit">S'inscrire</button>
        </form>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span>
            Tu as déjà compte ? Connecte-toi, tu pourras mettre en favoris tes
            héros préférés !
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;

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
  // State to Info User
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State to Error
  const [errorEmail, setErrorEmail] = useState();
  const [errorEmailRegex, setErrorEmailRegex] = useState();
  const [errorEmailLength, setErrorEmailLength] = useState();

  const [errorUserName, setErrorUserName] = useState();
  const [errorUserNameLength, setErrorUserNameLength] = useState();

  const [errorPasswordRegex, setErrorPasswordRegex] = useState();

  const history = useHistory();

  //eslint-disable-next-line
  const characterAllowed = /[\w\d\-]+/;
  const emptyString = /\s+/;
  const specialCharacter = /[$&+,:;=?@#|'<>.^*()%!]+/;
  const regexEmail = /\S+@\S+\.\S+/;
  const regexPassword =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{10,}$/;

  // We create a function which makes a request to create the user
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (regexPassword.test(password)) {
      if (email.length > 20) {
        setErrorEmailLength("Please a email of less than 20 characters");
      } else {
        if (regexEmail.test(email)) {
          if (userName.length > 10) {
            setErrorUserNameLength(
              "Please a username of less than 10 characters"
            );
          } else {
            if (specialCharacter.test(userName) || emptyString.test(userName)) {
              setErrorUserName("Please enter a correct username");
            } else if (characterAllowed.test(userName)) {
              try {
                event.preventDefault();
                const response = await axios.post(
                  "https://marvel-backend-luc.herokuapp.com/user/signup",
                  {
                    username: userName,
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
                  setErrorEmail("This email already has an account with us!");
                }
              }
            }
          }
        } else {
          setErrorEmailRegex("Please enter a correct email.");
        }
      }
    } else {
      setErrorPasswordRegex(
        "Please enter a password longer than 10 characters with a number, an uppercase letter and a special character."
      );
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
                  <h2>Register now</h2>
                </div>

                {/* we create a form to retrieve the data we need for authentication */}

                <form onSubmit={handleSubmit} className="ballon">
                  <span className="tip"></span>
                  <div className="username">
                    <input
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(event) => {
                        setUserName(event.target.value);
                        setErrorUserName("");
                        setErrorUserNameLength("");
                      }}
                    />
                  </div>
                  <div className="email">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setErrorEmail("");
                        setErrorEmailLength("");
                        setErrorEmailRegex("");
                      }}
                    />
                  </div>
                  <div className="password">
                    <input
                      type="password"
                      placeholder="Password"
                      autoComplete="on"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setErrorPasswordRegex("");
                      }}
                    />
                  </div>

                  <button className="submit" type="submit">
                    To log in
                  </button>
                  <div className="email-error">
                    {errorEmail}
                    {errorUserName}
                    {errorUserNameLength}
                    {errorEmailRegex}
                    {errorEmailLength}
                    {errorPasswordRegex}
                  </div>
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

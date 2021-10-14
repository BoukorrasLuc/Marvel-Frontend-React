import { useState } from "react";

const LogiqueModale = () => {
  const [reveleModaleLogin, changeReveleModaleLogin] = useState(false);
  const [reveleModaleSignUp, changeReveleModaleSignUp] = useState(false);

  function toggleModaleLogin() {
    changeReveleModaleLogin(!reveleModaleLogin);
  }
  function toggleModaleSignUp() {
    changeReveleModaleSignUp(!reveleModaleSignUp);
  }

  return {
    reveleModaleLogin,
    toggleModaleLogin,
    changeReveleModaleLogin,
    reveleModaleSignUp,
    toggleModaleSignUp,
    changeReveleModaleSignUp,
  };
};

export default LogiqueModale;

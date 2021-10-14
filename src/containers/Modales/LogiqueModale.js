import { useState } from "react";

const LogiqueModale = () => {
  const [reveleModaleLogin, changeReveleModaleLogin] = useState(false);

  function toggleModaleLogin() {
    changeReveleModaleLogin(!reveleModaleLogin);
  }

  return {
    reveleModaleLogin,
    toggleModaleLogin,
    changeReveleModaleLogin,
  };
};

export default LogiqueModale;

import React from "react";

const ChangePasswordContext = React.createContext({
  changePassword: false,
  setChangePassword: () => {},
});

export { ChangePasswordContext };

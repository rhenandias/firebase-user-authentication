import React from "react";

const DeleteUserContext = React.createContext({
  deleteUser: false,
  setDeleteUser: () => {},
});

export { DeleteUserContext };

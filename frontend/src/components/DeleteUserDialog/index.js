import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../services/Firebase";

import { DeleteUserContext } from "./context";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  LinearProgress,
  Snackbar,
  Slide,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteUserDialog() {
  const { deleteUser, setDeleteUser } = useContext(DeleteUserContext);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  function handleSubmit() {
    setLoading(true);

    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          localStorage.removeItem("localStorageUser");
          setSuccess(true);
          setLoading(false);
          setDeleteUser(false);
        })
        .catch((error) => {
          setFailure(true);
          setLoading(false);
          setDeleteUser(false);
        });
    }
  }

  return (
    <>
      {/* Diálogo de apagar conta de usuário */}
      <Dialog open={deleteUser} TransitionComponent={Transition}>
        <DialogTitle>{"Apagar conta de usuário?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            As informações serão removidas do banco de dados e não será possível
            recuperá-las.
          </DialogContentText>
          <DialogContentText>
            O endereço de e-mail poderá ser utilizado para um novo cadastro.
          </DialogContentText>
          {loading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setDeleteUser(false)}>
            Voltar
          </Button>
          <Button color="primary" onClick={() => handleSubmit()}>
            Sim, apagar esta conta
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alerta de conta de usuário apagada com sucesso */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => history.push("/")}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Usuário removido. Redirecionando.
        </MuiAlert>
      </Snackbar>

      {/* Alerta de erro ao apagar conta de usuário */}
      <Snackbar open={failure} onClose={() => {}}>
        <MuiAlert
          severity="error"
          elevation={6}
          variant="filled"
          onClose={() => setFailure(false)}
        >
          Esta ação é sensível e exige autenticação recente. Realize login
          novamente antes de tentar apagar a conta de usuário.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

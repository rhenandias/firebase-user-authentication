import React, { useState, useContext } from "react";
import firebase from "../../services/Firebase";
import { ResetPasswordContext } from "./context";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  LinearProgress,
  Snackbar,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";

export default function ResetPasswordDialog() {
  const { open, setOpen } = useContext(ResetPasswordContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleClose() {
    setOpen(false);
    setEmail("");
    setError(false);
  }

  function resetPassword() {
    setSubmitLoading(true);
    setError(false);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        handleClose();
        setSubmitLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        dealError(error);
        setSubmitLoading(false);
      });
  }

  function dealError(error) {
    setError(true);
    switch (error.code) {
      case "auth/invalid-email":
        setErrorMessage("Endereço de email inválido");
        break;
      case "auth/user-not-found":
        setErrorMessage("Não há usuário cadastrado com este email");
        break;
      default:
        setErrorMessage("Erro inesperado");
        break;
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Esqueceu sua senha?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe o email de usuário cadastrado para receber uma soliticação
            de alteração de senha.
          </DialogContentText>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              resetPassword();
            }}
          >
            <TextField
              autoFocus
              label="Endereço de email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              helperText={error ? errorMessage : "Email de usuário"}
            />
          </form>
          {submitLoading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => resetPassword()} color="primary">
            Alterar Senha
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Pedido de restauração de senha enviado
        </MuiAlert>
      </Snackbar>
    </>
  );
}

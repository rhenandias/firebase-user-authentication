import React, { useState, useContext } from "react";
import firebase from "../../services/Firebase";

import { ChangePasswordContext } from "./context";
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
  InputAdornment,
  IconButton,
  Slide,
} from "@material-ui/core";

import MuiAlert from "@material-ui/lab/Alert";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChangePasswordDialog() {
  const { changePassword, setChangePassword } = useContext(ChangePasswordContext);

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  function handleClose() {
    setChangePassword(false);
    setError(false);
    setLoading(false);
    setPassword("");
  }

  function handleSubmit() {
    setLoading(true);
    setError(false);

    const user = firebase.auth().currentUser;
    if (user) {
      user
        .updatePassword(password)
        .then(() => {
          setSuccess(true);
          handleClose();
        })
        .catch((error) => {
          setLoading(false);
          dealError(error);
        });
    }
  }

  function dealError(error) {
    setError(true);
    switch (error.code) {
      case "auth/weak-password":
        setErrorMessage("Insira uma senha com ao menos 6 caracteres");
        break;
      case "auth/requires-recent-login":
        setFailure(true);
        handleClose();
        break;
      default:
        console.log("Error desconhecido");
        handleClose();
        break;
    }
  }

  return (
    <>
      <Dialog open={changePassword} maxWidth={"xs"} TransitionComponent={Transition}>
        <DialogTitle>Alterar senha</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Informe uma nova senha para esta conta de usuário. A senha deve
            conter ao menos 6 caracteres.
          </DialogContentText>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextField
              label="Senha"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText={error ? errorMessage : "Senha de usuário"}
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {loading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleSubmit()} color="primary">
            Alterar Senha
          </Button>
        </DialogActions>
      </Dialog>

      {/*  Alerta de sucesso na alteração de senha */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
      >
        <MuiAlert severity="success" elevation={6} variant="filled">
          Senha alterada com sucesso. No próximo login, utilize a nova senha.
        </MuiAlert>
      </Snackbar>

      {/*  Alerta de falha na alteração de senha */}
      {/* Alerta de erro ao apagar conta de usuário */}
      <Snackbar open={failure} onClose={() => {}}>
        <MuiAlert
          severity="error"
          elevation={6}
          variant="filled"
          onClose={() => setFailure(false)}
        >
          Esta ação é sensível e exige autenticação recente. Realize login
          novamente antes de tentar alterar a senha de usuário.
        </MuiAlert>
      </Snackbar>
    </>
  );
}

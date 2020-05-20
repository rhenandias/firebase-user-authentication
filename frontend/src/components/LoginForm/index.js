import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import firebase from "../../services/Firebase";

import { LoginFormContext } from "./context";

import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  makeStyles,
  Grid,
  Typography,
  TextField,
  FormControl,
  Button,
  InputAdornment,
  IconButton,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    marginBottom: theme.spacing(1),
  },
  loginForm: {
    "& #realizar-login": {
      marginBottom: theme.spacing(1),
    },
    "& #form-field": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function LoginForm() {
  const { setLoading } = useContext(LoginFormContext);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        history.push("/profile");
      }
    });
    return () => unsubscribe();
  });

  async function handleLogin(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    setLoading(true);
    setEmailError(false);
    setPasswordError(false);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("localStorageUser", JSON.stringify(user.user));
      })
      .catch((error) => {
        dealError(error);
        setLoading(false);
      });
  }

  function dealError(error) {
    switch (error.code) {
      case "auth/invalid-email":
        setEmailError(true);
        setEmailErrorMessage("Endereço de email inválido");
        break;
      case "auth/user-disabled":
        setEmailError(true);
        setEmailErrorMessage("Esta conta de usuário foi desativada");
        break;
      case "auth/user-not-found":
        setEmailError(true);
        setEmailErrorMessage("Não há usuário cadastrado com este email");
        break;
      case "auth/wrong-password":
        setEmailError(true);
        setPasswordError(true);
        setEmailErrorMessage("Senha ou email de usuário inválidos");
        setPasswordErrorMessage("Senha ou email de usuário inválidos");
        break;
      default:
        setEmailError(true);
        setPasswordError(true);
        setEmailErrorMessage("Erro Inesperado");
        setPasswordErrorMessage("Erro Inesperado");
        console.log(error.message);
        break;
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Grid container direction="column" className={classes.loginForm}>
        <Typography id="realizar-login" variant="subtitle1">
          Realizar Login
        </Typography>
        <FormControl id="form-field">
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={emailError ? emailErrorMessage : "Email de usuário"}
            error={emailError}
          />
        </FormControl>

        <FormControl id="form-field">
          <TextField
            label="Senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            helperText={
              passwordError ? passwordErrorMessage : "Senha de usuário"
            }
            error={passwordError}
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
        </FormControl>

        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="primary"
          disableElevation
        >
          Login
        </Button>
      </Grid>
    </form>
  );
}

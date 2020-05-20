import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../services/Firebase";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { RegisterFormContext } from "../../components/RegisterForm/context";

import {
  Grid,
  Typography,
  FormControl,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  registerForm: {
    "& #cadastrar-usuario": {
      marginBottom: theme.spacing(1),
    },
    "& #form-field": {
      marginBottom: theme.spacing(2),
    },
  },
  button: {
    textTransform: "none",
    marginBottom: theme.spacing(1),
  },
}));

export default function RegisterForm() {
  const { setLoading } = useContext(RegisterFormContext);

  const theme = useTheme();
  const classes = useStyles(theme);

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await user.updateProfile({
          displayName: name,
        });

        const currentUser = JSON.parse(JSON.stringify(user));
        currentUser.displayName = name;
        localStorage.setItem("localStorageUser", JSON.stringify(currentUser));
        history.push("/profile");
      }
    });

    return () => unsubscribe();
  });

  async function handleRegister(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    setLoading(true);
    setEmailError(false);
    setPasswordError(false);
    setNameError(false);

    if (name.length < 3 || name.length > 30) {
      setNameError(true);
      setLoading(false);
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        dealError(error);
        setLoading(false);
      });
  }

  function dealError(error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        setEmailError(true);
        setEmailErrorMessage("Este endereço de email já está sendo utilizado");
        break;
      case "auth/invalid-email":
        setEmailError(true);
        setEmailErrorMessage("Insira um endereço de email válido");
        break;
      case "auth/weak-password":
        setPasswordErrorMessage("Insira uma senha com ao menos 6 caracteres");
        setPasswordError(true);
        break;
      default:
        setEmailError(true);
        setPassword(true);
        setNameError(true);
        setEmailErrorMessage("Erro inesperado");
        setPasswordErrorMessage("Erro inesperado");
        setNameErrorMessage("Erro inesperado");
        console.log(error.message);
        break;
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <Grid className={classes.registerForm} container direction="column">
        <Typography id="cadastrar-usuario" variant="subtitle1">
          Cadastrar usuário
        </Typography>
        <FormControl id="form-field">
          <TextField
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText={
              nameError
                ? nameErrorMessage
                : "Email de usuário"
            }
            error={nameError}
          />
        </FormControl>
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
          Cadastrar
        </Button>
      </Grid>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import firebase from "../../services/Firebase";

import GithubIcon from "../../assets/github.png";

import { Visibility, VisibilityOff, LockOpen } from "@material-ui/icons";
import { useTheme } from "@material-ui/core/styles";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Grid,
  FormControl,
  Link as MaterialLink,
  Container,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up(780)]: {
      margin: theme.spacing(4),
    },
  },
  resetCard: {
    width: theme.spacing(52),
  },
  resetHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1),
    "& h5": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  resetForm: {
    "& #restaurar-senha": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
    },
    "& #form-field": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  button: {
    textTransform: "none",
    marginBottom: theme.spacing(4),
  },
  loginFooter: {
    "& #link": {
      marginTop: theme.spacing(1),
    },
  },
  githubIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      margin: theme.spacing(1),
    },
  },
  loadingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(52),
    height: theme.spacing(50),
    margin: theme.spacing(2),
  },
  codeError: {
    "& #title": {
      fontWeight: "bold",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    "& #link": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  bold: {
    fontWeight: "bold",
  },
  success: {
    padding: 0,
    "& *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
}));

export default function PasswordReset() {
  const history = useHistory();

  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState();
  const [codeHealth, setCodeHealth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const [success, setSuccess] = useState(false); //essa

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");
    if (oobCode) {
      firebase
        .auth()
        .verifyPasswordResetCode(oobCode)
        .then((email) => {
          setMounted(true);
          setCodeHealth(true);
          setCode(oobCode);
          setEmail(email);
        })
        .catch((error) => {
          setMounted(true);
          setCodeHealth(false); //essa
        });
    } else {
      history.push("/");
    }
  });

  function handleError(error) {
    setError(true);
    setSubmitLoading(false);
    switch (error.code) {
      case "auth/weak-password":
        setErrorMessage("A senha deve ter ao menos 6 caracteres");
        break;
      default:
        setErrorMessage("Erro inesperado");
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    setError(false);
    setSubmitLoading(true);

    firebase
      .auth()
      .confirmPasswordReset(code, password)
      .then(() => {
        setSuccess(true);
        setSubmitLoading(false);
        setTimeout(() => history.push("/"), 5000);
      })
      .catch((error) => {
        handleError(error);
      });
  }

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {/* Loading antes da página carregar */}
      {!mounted && (
        <Card className={classes.loadingCard} raised variant="outlined">
          <CircularProgress />
        </Card>
      )}

      {/* Exibindo quando a página está carregada */}
      {mounted && (
        // Card de restauração de senha
        <Card className={classes.resetCard} raised variant="outlined">
          {submitLoading && <LinearProgress />}
          {/* Header do card */}
          <CardContent>
            <Container className={classes.resetHeader}>
              <LockOpen color="action" style={{ fontSize: 50 }} />
              <Typography variant="h5">Restauração de senha</Typography>
            </Container>

            {/* Código válido */}
            {codeHealth && !success && (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  className={classes.resetForm}
                >
                  <Typography id="restaurar-senha" variant="subtitle1">
                    Cadastrar nova senha para:
                  </Typography>
                  <Typography className={classes.bold}>{`${email}`}</Typography>
                  <FormControl id="form-field">
                    <TextField
                      label="Nova Senha"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={error}
                      helperText={
                        error ? errorMessage : "Cadastrar nova senha de usuário"
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
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
                    Enviar
                  </Button>
                </Grid>
              </form>
            )}

            {/* Código inválido */}
            {!codeHealth && !success && (
              <Grid className={classes.codeError}>
                <Typography id="title">
                  Tente resetar a sua senha novamente
                </Typography>
                <Typography id="message">
                  A sua requisição para restauração de senha expirou ou este
                  link já foi utilizado.
                </Typography>
                <Typography id="link">
                  <MaterialLink component={RouterLink} to={"/"}>
                    Voltar para a página inicial
                  </MaterialLink>
                </Typography>
              </Grid>
            )}

            {/*  Restauração concluida com sucesso */}
            {success && (
              <Container className={classes.success}>
                <Typography className={classes.bold}>
                  Senha alterada com sucesso
                </Typography>
                <Typography>
                  Você será redirecionado para a página inicial e já pode
                  realizar login com a nova senha
                </Typography>
                <Typography>
                  Caso não seja redirecionado,{" "}
                  <MaterialLink component={RouterLink} to={"/"}>
                    clique aqui
                  </MaterialLink>
                </Typography>
              </Container>
            )}

            {/* Footer com icone do github */}
            <Grid>
              <MaterialLink
                className={classes.githubIcon}
                href="https://github.com/rhenandias/firebase-user-authentication"
                target="_blank"
              >
                <Typography>Fork me on Github</Typography>
                <img src={GithubIcon} width="32" alt="Github logo" />
              </MaterialLink>
            </Grid>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

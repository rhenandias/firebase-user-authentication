import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import GithubIcon from "../../assets/github.png";

import { ResetPasswordContext } from "../../components/ResetPasswordDialog/context";
import { LoginFormContext } from "../../components/LoginForm/context";

import LoginForm from "../../components/LoginForm";
import ResetPasswordDialog from "../../components/ResetPasswordDialog";

import { AccountCircle } from "@material-ui/icons";
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MaterialLink,
  Container,
  LinearProgress,
  useTheme,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up(780)]: {
      margin: theme.spacing(4),
    },
  },
  loginCard: {
    width: theme.spacing(52),
    height: theme.spacing(74),
  },
  loginHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    "& h5": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
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
    margin: theme.spacing(2),
    "& img": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Login() {
  const [loading, setLoading] = useState(false);
  const formContextValue = { loading, setLoading };

  const [open, setOpen] = useState(false);
  const dialogContextValue = { open, setOpen };

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {/* Card de login */}
      <Card className={classes.loginCard} raised variant="outlined">
        {loading && <LinearProgress />}
        <CardContent>
          {/* Header do carde de Login */}
          <Container className={classes.loginHeader}>
            <AccountCircle color="action" style={{ fontSize: 70 }} />
            <Typography variant="h5">Autenticação de usuário</Typography>
          </Container>

          {/* Formulário de Login */}
          <LoginFormContext.Provider value={formContextValue}>
            <LoginForm />
          </LoginFormContext.Provider>

          {/* Footer do Card de Login */}
          <Grid className={classes.loginFooter}>
            <Typography id="link">
              <MaterialLink component={RouterLink} to={"/register"}>
                Não tem conta? Cadastre-se
              </MaterialLink>
            </Typography>
            <Typography id="link">
              <MaterialLink href="#" onClick={() => setOpen(true)}>
                Esqueceu sua senha?
              </MaterialLink>
            </Typography>
          </Grid>
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

      {/* Diálogo de recuperação de senha */}
      <ResetPasswordContext.Provider value={dialogContextValue}>
        <ResetPasswordDialog />
      </ResetPasswordContext.Provider>
    </div>
  );
}

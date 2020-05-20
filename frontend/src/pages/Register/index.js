import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import GithubIcon from "../../assets/github.png";

import ResetPasswordDialog from "../../components/ResetPasswordDialog";
import { ResetPasswordContext } from "../../components/ResetPasswordDialog/context";

import RegisterForm from "../../components/RegisterForm";
import { RegisterFormContext } from "../../components/RegisterForm/context";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MaterialLink,
  Container,
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
  registerCard: {
    width: theme.spacing(52),
    height: theme.spacing(74),
  },
  registerHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  registerFooter: {
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

export default function Register() {
  // Variables for Reset Password Dialog
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };

  // Variables for Register Form
  const [loading, setLoading] = useState(false);
  const formContextValue = { loading, setLoading };

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {/* Card de Registro */}
      <Card className={classes.registerCard} raised variant="outlined">
        {loading && <LinearProgress />}
        {/* Header do Card de Registro */}
        <CardContent>
          <Container className={classes.registerHeader}>
            <Typography variant="h5">Cadastro de novo usuário</Typography>
          </Container>

          {/* Formulário de Registro */}
          <RegisterFormContext.Provider value={formContextValue}>
            <RegisterForm />
          </RegisterFormContext.Provider>

          {/* Footer da página de registro */}
          <Grid className={classes.registerFooter}>
            <Typography id="link">
              <MaterialLink component={RouterLink} to={"/"}>
                Já possui uma conta? Realizar login
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
      <ResetPasswordContext.Provider value={value}>
        <ResetPasswordDialog />
      </ResetPasswordContext.Provider>
    </div>
  );
}

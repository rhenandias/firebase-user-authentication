import React, { useState, useEffect } from "react";
import firebase from "../../services/Firebase";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

import ChangePasswordDialog from "../../components/ChangePasswordDialog";
import { ChangePasswordContext } from "../../components/ChangePasswordDialog/context";

import DeleteUserDialog from "../../components/DeleteUserDialog";
import { DeleteUserContext } from "../../components/DeleteUserDialog/context";

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardActions,
  IconButton,
  Chip,
  Container,
  CircularProgress,
} from "@material-ui/core";

import {
  Menu,
  AccountCircle,
  AssignmentInd,
  Email,
  Code,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    textTransform: "none",
  },
  cardsRoot: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  generalCard: {
    width: theme.spacing(52),
    height: theme.spacing(68),
    margin: theme.spacing(2),
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
    "& #info-element": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: theme.spacing(2),
      "& #chip": {
        margin: theme.spacing(1),
      },
    },
  },
  infoCardHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
    "& h5": {
      marginTop: theme.spacing(1),
    },
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-around",
    margin: theme.spacing(2),
  },
  messageCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    "& h5": {
      margin: theme.spacing(1),
    },
  },
  messagesForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& #form-control": {
      "& #message-field": {
        width: theme.spacing(37),
      },
    },
  },
  loadingCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: theme.spacing(52),
    height: theme.spacing(68),
    margin: theme.spacing(2),
  },
}));

export default function Profile() {
  // Tech
  const history = useHistory();
  const [mounted, setMounted] = useState(false);

  // Change Password Context values
  const [changePassword, setChangePassword] = useState(false);
  const ChangePasswordContextValue = { changePassword, setChangePassword };

  // Delete User Context values
  const [deleteUser, setDeleteUser] = useState(false);
  const DeleteUserContextValue = { deleteUser, setDeleteUser };

  // User Card props
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");

  // Style
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        setUserEmail(user.email);
        setUserId(user.uid);
        setMounted(true);
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleSignOut() {
    firebase.auth().signOut();
    localStorage.removeItem("localStorageUser");
    history.push("/");
  }

  return (
    <div>
      <div className={classes.root}>
        {/* Appbar no topo da página */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Página de Usuário
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sair
            </Button>
          </Toolbar>
        </AppBar>

        {/* Card da página de profile */}
        <Grid className={classes.cardsRoot}>
          {/* Card com informações de usuário */}
          {mounted && (
            <Card className={classes.generalCard} raised variant="outlined">
              <Container className={classes.infoCardHeader}>
                <AccountCircle color="action" style={{ fontSize: 70 }} />
                <Typography variant="h5">Perfil de Usuário</Typography>
              </Container>
              <Container className={classes.userInfo}>
                <Container id="info-element">
                  <Typography variant="subtitle1" fontWeight="fontWeightBold">
                    {userName}
                  </Typography>
                  <Chip
                    id="chip"
                    label="User Name"
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<AssignmentInd />}
                  />
                </Container>
                <Container id="info-element">
                  <Typography variant="subtitle1" fontWeight="fontWeightBold">
                    {userEmail}
                  </Typography>
                  <Chip
                    id="chip"
                    label="User Email"
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<Email />}
                  />
                </Container>
                <Container id="info-element">
                  <Typography variant="subtitle1" fontWeight="fontWeightBold">
                    {userId}
                  </Typography>
                  <Chip
                    id="chip"
                    label="User ID"
                    variant="outlined"
                    size="small"
                    color="primary"
                    icon={<Code />}
                  />
                </Container>
              </Container>
              <CardActions className={classes.buttonGroup}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={() => setChangePassword(true)}
                >
                  Alterar Senha
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="default"
                  disableElevation
                  onClick={() => setDeleteUser(true)}
                >
                  Apagar Conta
                </Button>
              </CardActions>
            </Card>
          )}
          {/* Card de Loading  */}
          {!mounted && (
            <Card className={classes.loadingCard} raised variant="outlined">
              <CircularProgress />
            </Card>
          )}
        </Grid>

        {/* Diálogo de exclusão de conta de usuário */}
        <DeleteUserContext.Provider value={DeleteUserContextValue}>
          <DeleteUserDialog />
        </DeleteUserContext.Provider>

        {/* Dialogo de alteração de senha */}
        <ChangePasswordContext.Provider value={ChangePasswordContextValue}>
          <ChangePasswordDialog />
        </ChangePasswordContext.Provider>
      </div>
    </div>
  );
}

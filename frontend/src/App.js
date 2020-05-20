import React from "react";
import Routes from "./routes";

import Theme from "./components/MaterialTheme";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}

export default App;

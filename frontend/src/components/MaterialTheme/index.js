import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#039BE5",
    },
  },
  props: {
    MuiTextField: { InputProps: { spellCheck: 'false' } }
  }
});

export default Theme;

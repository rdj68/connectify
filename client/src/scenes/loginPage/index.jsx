import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Form from "./Form";
const theme = createTheme();

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <Form />
    </ThemeProvider>
  );
}

import ReduxToastr from "react-redux-toastr"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { useAppTheme } from "./hooks/useAppTheme"
import Router from "./Router"
import "./App.scss"

function App() {
  const theme = useAppTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />

      <ReduxToastr
        timeOut={2000}
        preventDuplicates={true}
        newestOnTop={false}
        position="bottom-center"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
    </ThemeProvider>
  )
}

export default App

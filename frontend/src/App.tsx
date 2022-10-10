import React, { useEffect } from 'react';
import ReduxToastr from 'react-redux-toastr';
import { BrowserRouter as Router, Route} from "react-router-dom"
import { Routes } from 'react-router';
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./pages/HomePage/HomePage";
import Users from "./pages/Users/Users";
import Cards from "./pages/Cards/Cards";
import Collections from "./pages/Collections/Collections";
import AppOn from "./AppOn";
import './App.scss';
import CardItem from "./components/CardItem/CardItem";
import CardSidebar from "./pages/Cards/components/CardSidebar";

const theme = createTheme({
  palette: {
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 5,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<AppOn />}>
              <Route path="home" element={<HomePage/>}/>
              <Route path="cards" element={<Cards/>}>
                <Route path=':id' element={<CardSidebar />} />
              </Route>
              <Route path="collections" element={<Collections/>}/>
              <Route path="users" element={<Users/>}/>
            </Route>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<SignUp/>}/>
          </Routes>
        </Router>
      </div>

      <ReduxToastr
        timeOut={30000}
        preventDuplicates={true}
        newestOnTop={false}
        position="bottom-center"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
    </ThemeProvider>
  );
}

export default App;

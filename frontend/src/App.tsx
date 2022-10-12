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
import CardSidebar from "./components/CardSidebar/CardSidebar";
import './App.scss';
import CollectionSidebar from "./components/CollectionSidebar/CollectionSidebar";
import AdminRoute from "./app/AdminRoute";
import NotFound from "./pages/NotFound";
import { useAppTheme } from "./hooks/useAppTheme";

function App() {
  const theme = useAppTheme();

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
              <Route path="collections" element={<Collections/>}>
                <Route path=':id' element={<CollectionSidebar />} />
              </Route>
              <Route path='/' element={<AdminRoute />}>
                <Route path='/users' element={<Users/>} />
              </Route>
            </Route>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<SignUp/>}/>

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </Router>
      </div>

      <ReduxToastr
        timeOut={2000}
        preventDuplicates={true}
        newestOnTop={false}
        position="bottom-left"
        transitionIn="bounceIn"
        transitionOut="bounceOut"
        progressBar
      />
    </ThemeProvider>
  );
}

export default App;

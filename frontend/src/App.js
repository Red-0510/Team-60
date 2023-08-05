// import logo from './logo.svg';
// import './App.css';
import SignInForm from './components/auth/SignInSide'
import SignUpForm from './components/auth/SignUp'
import Dashboard from './components/dashboard/dashboard';
import Nav from './components/nav/nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResetPassword from './components/reset/reset';

// toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import SignInSide from './components/auth/SignInSide';
import ForgotPassword from './components/auth/forgotPassword';



function App() {

  return (
    <ThemeProvider theme={createTheme()}>
      <div className="App">
        <ToastContainer />
        <Nav />
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Home />} /> */}
            {/* <Route path='/ser' element={<Services />} />
            <Route path='/pro' element={<Profile />} /> */}
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<SignInSide />} />
            <Route path='/reg' element={<SignUpForm />} />
            <Route path='/reset/:resetToken' element={<ResetPassword />} />
            <Route path='/forgot' element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>  
      </div>
    </ThemeProvider>
  );
}

export default App;

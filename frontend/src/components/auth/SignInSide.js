import React, { useState } from 'react';
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginUser, registerUser, validateEmail } from '../../services/authService';

function SignInSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [disable,setDisable] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      return toast.error("Please enter email and password")
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }

    const userData={
      email,
      password,
    }

    try{
      setDisable(true)
      const data = await loginUser(userData,dispatch);
      if(!data){
        setDisable(false)
        return
      }
      navigate("/");
    }catch(err){
      setDisable(false)
      console.log(err)
    }

  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'https://th.bing.com/th/id/OIG.rEbB3sC95y7PHmSYGxrs?w=270&h=270&c=6&r=0&o=5&pid=ImgGn',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button type="submit" onClick={handleSubmit} disabled={disable} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}  style={{background: '#070f42'}}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/reg" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}

export default SignInSide;

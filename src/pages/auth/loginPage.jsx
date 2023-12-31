import React, {useEffect, useState} from "react";
import { Link as Nav, useNavigate} from 'react-router-dom'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Card, CssBaseline, FormControlLabel, TextField, Checkbox, Link, Paper, Avatar, Button, Box, Grid } from "@mui/material";
import {useSelector, useDispatch} from 'react-redux'
import { loginUser } from "../../redux/actions/authAction";
import Cookies from "universal-cookie";
import { Toaster } from "react-hot-toast";
import { banner_1 } from "../../assets";



function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '} Sales-AI By   
        <Link color="inherit" href="https://browpay.com">Browpay</Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

const initialValues = {
  email: '',
  password: ''
}

const defaultTheme = createTheme();

const LoginPage = () => {

  const [formValues, setFormValues] = useState(initialValues)
  const dispatcher = useDispatch()
  const navigator = useNavigate()
  const isLoggedIn = useSelector(state => state.authReducer)
  const userData = useSelector(state => state.authReducer.data)

  const cookie = new Cookies()

  const handleInput = (event) => {
    const { name, value }  = event.target

    setFormValues({...formValues, [name] : value})
  }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
        dispatcher(loginUser(formValues))
      };

      useEffect(() => {
        // console.log(userData.token)
        // token isLoggedIn const is only called once so the auth handling and use state control functionality is set in the Gateway component
      if(isLoggedIn.isLoggedIn){
        cookie.set("SECRETKEY", isLoggedIn.data.token, {
          path: "/"
        })
        navigator('/dashboard')
      }
        
      }, [isLoggedIn, handleSubmit])


    return (
        <>
          <ThemeProvider theme={defaultTheme} />
          <div className="flex w-[80%] justify-between mx-auto h-screen items-center">
            <div className='hidden md:flex flex-col w-full md:w-3/5 sm:w-3/5'>
              <img src={banner_1} className="w-[70%] m-auto" alt="banner" />
            </div>

            <div className='block'>
              <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '50px',
                  }}

                  component={Paper}
              >
                <Nav to={`/`} className="mx-auto mt-28 md:mt-auto mb-4 text-center text-4xl font-semibold text-blue-400">MySeller.ai </Nav>                
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    // autoComplete="email"
                    autoFocus
                    onChange={handleInput}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    // autoComplete="current-password"
                    onChange={handleInput}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Nav to="/reset-password" variant="body2">
                        Forgot password?
                      </Nav>
                    </Grid>
                    {/* <Grid item>
                      <Nav to="/register" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Nav>
                    </Grid> */}
                  </Grid>
                </Box>
              </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </div>
          </div>
        </>
    )
}

export default LoginPage;
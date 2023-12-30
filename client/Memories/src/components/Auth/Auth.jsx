import { Avatar,Button,Paper,Grid,Typography,Container } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useState } from "react"
import Input from "./input"
import {GoogleOAuthProvider,GoogleLogin} from '@react-oauth/google'
import useStyles from './styles'
import { useDispatch } from "react-redux"
import jwtDecode from 'jwt-decode'
import LoginGoogle from "./LoginGoogle"
import {signup,signin} from '../../actions/auth'
import { useHistory } from "react-router-dom"
const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''} 
const Auth = () => {
  
  const[showPassword,setShowPassword]=useState(false)
  const[isSignUp,setIsSignUp]=useState(false)
  const[formData,setFormData]=useState(initialState)
  const classes=useStyles()
  const dispatch=useDispatch()

  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
  const history=useHistory()
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(isSignUp){
        dispatch(signup(formData,history))
    }else{
        dispatch(signin(formData,history))
    }
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
  const switchMode=()=>{
    setIsSignUp((prevState)=>!prevState)
    setShowPassword(false)
    }
  
//   const googleSuccess=async(res)=>{
//     console.log(res);
//     const decoded = jwtDecode(res.credential)
//     console.log('Login Successful',decoded);
    
//   }
//   const googleFailure=(err)=>{
//     console.log(err);
//     console.log('Google Sign In was unsuccessful');
//   }
  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">
                {isSignUp?'Sign Up':'Sign In'}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>  
                              <Input name="lastName" label="Last Name" handleChange={handleChange}  half/>  
                                
                            </>
                        )
                    }
                    <Input name="email" type="email" label="Email Address" handleChange={handleChange} />
                    <Input name="password" type={showPassword?'text':'password'} label="password" handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                    {isSignUp && <Input name="confirmPassword" type="password" label="Repeat Password" handleChange={handleChange} />}
                </Grid>
                
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{isSignUp?'Sign Up':'Sign In'}</Button>
                <GoogleOAuthProvider clientId="1086711609787-arlp7qagblvmgkkqiq91kg59ui1l67lv.apps.googleusercontent.com">
                <LoginGoogle/>
                {/* <GoogleLogin
                    
                    render={(renderProps)=>(
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            // disabled={renderProps.disabled}
                            startIcon={<GIcon/>}
                            variant="contained"          
                        >
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                /> */}
                </GoogleOAuthProvider>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignUp?'Already have an account? Sign In':"Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}
export default Auth
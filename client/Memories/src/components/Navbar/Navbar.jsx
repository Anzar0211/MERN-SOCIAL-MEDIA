import React, { useState,useEffect } from "react"
import decode from 'jwt-decode'
import { AppBar,Avatar,Button,Toolbar,Typography } from "@material-ui/core"
import {Link,useHistory,useLocation} from 'react-router-dom'
import useStyles from './styles'
import memoriesText from '../../images/NOSTAL.png'
import memories from '../../images/AppLogo.png'
import { useDispatch } from "react-redux"
const Navbar = () => {
  const classes=useStyles()
  const[user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch=useDispatch()
  const history=useHistory()
  const location=useLocation()
  const logout=()=>{
    dispatch({type:'LOGOUT'});
    history.push('/')
    setUser(null)
  }
  useEffect(()=>{
    
    const token=user?.token
    if(token && token.length!==217){  //FROM CUSTOM AUTH
      const decodedToken=decode(token)
      if(decodedToken.exp*1000 < new Date().getTime()) logout()
    }
      //FROM GOOGLE AUTH
    // if(token && token.length===217){
    //     const decodedToken=user?.result
    //     if(decodedToken.exp*1000 < new Date().getTime()) logout()
    // }
    
    setUser(JSON.parse(localStorage.getItem('profile')))
  },[location])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
         <img src={memoriesText} alt="icon" height="70px"/>
          <img className={classes.image} src={memories} alt="memories" height="70px" />
        </Link>
        <Toolbar className={classes.toolbar} >
          {user?(
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6" ><strong>{user.result.name}</strong></Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ):(
            <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>
  )
}
export default Navbar
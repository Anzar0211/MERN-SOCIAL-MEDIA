import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios'
import GIcon from './Icon'
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import useStyles from './styles'
import {useDispatch} from 'react-redux'
const LoginGoogle = () => {
   const dispatch=useDispatch()
   const classes=useStyles()
   const history=useHistory()
   const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse);
      // fetching userinfo can be done on the client or the server
      let userInfo = await axios
        .get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(res => res.data).catch(undefined);
      userInfo={...userInfo,exp:tokenResponse.expires_in}
      console.log(userInfo);
      const token=tokenResponse?.access_token
      // console.log(token);
      const result=userInfo
      try {
        dispatch({type:'AUTH',data:{result,token}})
        history.push('/posts')
      } catch (error) {
        console.log(error);
      }
    },
    // flow: 'implicit', // implicit is the default
    
  });
  return (
    <Button 
    onClick={() => googleLogin()}
    className={classes.googleButton}
    color="primary"
    fullWidth
    startIcon={<GIcon/>}
    variant="contained" 
    >
          Log In Using Google
    </Button>
  )
}
export default LoginGoogle
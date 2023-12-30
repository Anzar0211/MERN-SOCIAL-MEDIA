import jwt,{decode} from 'jsonwebtoken';
import  {jwtDecode}  from "jwt-decode";
import axios from 'axios'
const auth=async(req,res,next)=>{
    try{
        
        const token=req.headers.authorization.split(" ")[1]
        const isCustomAuth=token.length!==217
        console.log(token,isCustomAuth)
        let decodedData;
        if(token && isCustomAuth){
            decodedData=jwt.verify(token,'test')
            req.userId=decodedData?.id
            console.log(decodedData)
            console.log(req.userId)
        }else{
            decodedData=  await axios
            .get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { authorization: `Bearer ${token}` },
            }).then(res => res.data).catch(undefined);
            
            req.userId=decodedData?.sub
            
        }
        
        next()
    }catch(e){
        console.log(e);
    }
}
export default auth
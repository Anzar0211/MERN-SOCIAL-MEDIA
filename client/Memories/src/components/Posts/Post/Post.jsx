
import React,{useState} from "react";
import {Card,CardActions,CardContent,CardMedia,Button,Typography,ButtonBase,Link} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import Visibility from "@material-ui/icons/Visibility"
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { deletePost,likePost } from '../../../actions/posts'
import { useHistory } from "react-router-dom";

const Post = ({post,setCurrentId}) => {
  const classes=useStyles()
  const history=useHistory()
  const dispatch=useDispatch();
  const user=JSON.parse(localStorage.getItem('profile'));
  const[likes,setLikes]=useState(post?.likes)
  const userId=user?.result?.sub || user?.result?._id
  const hasLikedPost=post?.likes.find((like)=>like===(userId))
  
  const handleLike=async()=>{
    dispatch(likePost(post?._id))
    if(hasLikedPost){
      setLikes(post?.likes.filter((id)=>id!==userId))
    }else{
      setLikes([...post?.likes,userId])
    }
  }
  const Likes=()=>{
    if(likes.length>0){
      // console.log(user?.result);
      return likes.find((like)=>like===(userId))?(
        <>
        <ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length>2?`You and ${likes.length-1} others`:`${likes.length} like${likes.length>1?'s':''}`}
        </>
      ):(
        <><ThumbUpAltIcon fontSize="small"/>&nbsp;{likes.length} {likes.length===1?'Like':'Likes'}</>
      )
    }
    return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>
  }
  const openPost=()=>history.push(`/posts/${post._id}`)
  
  return (
    <Card className={classes.card} raised elevation={6}>
    {/* <ButtonBase component="span" className={classes.cardAction} onClick={openPost}> */}
      <CardMedia className={classes.media} image={post?.selectedFile || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"} title={post?.title}/>
      <div className={classes.overlay}>
        <Typography variant="h6"><strong>{post?.name}</strong></Typography>
        <Typography variant="body2"><strong>{moment(post.createdAt).fromNow()}</strong></Typography>
      </div>
      {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator)&&(
        <div className={classes.overlay2}>
        <Button style={{color:'white'}} size="small" onClick={()=>setCurrentId(post?._id)}>
          <MoreHorizIcon fontSize="medium"/>
        </Button>
      </div>
      )}
      
      <div className={classes.details}>
      
        <Typography variant="body2" color="textSecondary" component="h2">{post?.tags.map((tag)=>`#${tag} `)}</Typography>
        
      </div>
      <Typography className={classes.title} component="h2" variant="h5" gutterBottom >{post.title}</Typography>
      <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
      </CardContent>
    {/* </ButtonBase> */}
    <CardActions className={classes.cardActions}>
      <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
        <Likes/>
      </Button>
      <Button  size="medium" color="primary"  onClick={openPost}>
        <Visibility fontSize="small"/>
        View Post
        </Button>
      {(user?.result?.sub===post?.creator || user?.result?._id===post?.creator) &&
      (<Button size="small" color="secondary" onClick={()=>dispatch(deletePost(post._id))}>
         <DeleteIcon fontSize="small"/>
        
      </Button>)}
    </CardActions>
    </Card>
  )
}
export default Post
import mongoose from "mongoose";
const Schema=mongoose.Schema
const postSchema=Schema({
    title:{type:String,required:true},
    message:{type:String,required:true},
    name:String,
    creator:String,
    tags:[String],
    selectedFile:{
        type:String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    comments:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})

const postMessage=mongoose.model('PostMessage',postSchema);
export default postMessage

import mongoose from "mongoose";    

const userShema = new mongoose.Schema({
      usename: String,
      fullname: String,
      password: String,
      email: String, 
      followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      }],
      following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      }],
      profileimage:{
        type:String,
        default: "",
      },
        coverimage:{
        type:String,
        default: "",
      },
      bio: String,
       link:String

       
})


const user =  mongoose.model('user',userShema);
export default user;
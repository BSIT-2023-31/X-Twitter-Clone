
import user from '../models/userModel.js';
import bcrypt from 'bcrypt'
import { gernateToken } from '../utils/gernateTokens.js';
import dotenv from 'dotenv';


dotenv.config();

export const LoginRoute = async function(req, res){
     let {email ,password} = req.body;
     try {
         let userfind = await user.findOne({email});
         let isPasswordIsCorrecdt = await bcrypt.compare(password, userfind.password)
          if(!userfind || !isPasswordIsCorrecdt ) {return res.send("invalid email or password")};

          gernateToken(userfind._id, res);
          res.send(userfind);
     } catch (error) {
          console.log("this error is coming in login controler " , error);
     }
};

export const LogoutRoute = function(req, res){
     try {
          res.cookie('token', '', {maxAge: 0});
          res.send("logout success full ")
     } catch (error) {
          console.log('this is coming from  a Logout Route' , error);
     }
};

export const SignupRoute =async function(req, res){
     let {fullname, username, password, email} = req.body;
   try {
      if(!fullname || !username || !password || !email) {
          return res.send('plase provid all fields');
      }
      const isMatch = await user.findOne({
          email
      })
      if(isMatch) return res.send("you have a account in this email");
       let salt  = await bcrypt.genSalt(10);
       let hash =  await bcrypt.hash(password, salt);
       const newUser = await user.create({
          fullname,
          email,
          password: hash,
          username,
       });
      
        gernateToken(newUser._id, res);
         res.send(newUser);
       
       
   } catch (error) {
     console.log(error)
   }
};


export const getMe =  async  (req,res)=>{
     try {
           const users = await user.findOne(req._id).select('-password');
           res.send(users);
     } catch (error) {
          console.log(error)
     }
}
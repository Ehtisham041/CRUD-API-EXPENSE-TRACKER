import mongoose from "mongoose"
import {Schema } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new Schema({

    username: 
    {
        type :String,
        required : true,
        unique:true,
        trim:true,
        lowercase:true
    },
    email:
{
    type:String,
    required:true,
    unique : true,
    lowercase:true,
    trim : true,
},
fullname:
{
    type:String,
    required:true,
    trim:true,
    index:true
},
password:
{
    type:String,
    required:[true, 'password is requirred']


},
budget: {
    type: Number,
    required: true,
    default: 20000
  },

},{
    timestamps: true
})

userSchema.pre("save", async function(next)
{

    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password , 10)
    next();
});
  
  userSchema.methods.isPasswordCorrect = async function(password)
  {
  return await bcrypt.compare(password ,this.password)
  };
  


  
  
  


export const User = mongoose.model("User", userSchema);
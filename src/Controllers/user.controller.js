import {User} from "../Models/user.model.js";
import {ApiError} from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import{ApiResponse} from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async(req,res,next)=>
  {
    //frist we need to get the data from the request body
    const {username, email, fullname ,password} = req.body;


  if ([username, email, fullname, password].some((field) => field?.trim() === "")) 
  {
    throw new ApiError(400, "All fields are required");
    
  }
    //check if the user already exists
    const userExists = await User.findOne({
      $or: [{username}, {email}]
    });
    if(userExists)
    {
      throw new ApiError(409, "User already exists");
    }

    console.log(req.file);
    const avatar = req.file?.path;
 
   console.log(avatar);

   if (!avatar) {
    throw new ApiError(400, "Avatar is required");
    
   }
   return new ApiResponse(201, "User created successfully");
    // const user = await User.create({username, email, password});
    // const accessToken = user.generateAccessToken();
    // const refreshToken = user.generateResfreshToken();
    // res.status(201).json(new ApiResponse(201,{accessToken, refreshToken}));
  }

);






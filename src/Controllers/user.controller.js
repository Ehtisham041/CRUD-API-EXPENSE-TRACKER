import { asyncHandler } from "../Utils/asyncHandler.js";
import {User} from "../Models/user.model.js";
import {ApiError} from "../Utils/ApiError.js";
import{ApiResponse} from "../Utils/ApiResponse.js";
import{uploadOnCloudinary} from "../Utils/cloudinary.js";
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

   // console.log(req.file);
    const avatar = req.file?.path;
 
   //console.log(avatar);

   if (!avatar) {
    throw new ApiError(400, "Avatar is required");
    
   }
  //upload it on cloudinary 
  const response = await uploadOnCloudinary({path: avatar});
  if (!response)
    {
    throw new ApiError(500, "Failed to upload avatar on cloudianry");
    }
    const user = await User.create({
      username,
      email,
      fullname, 
      password,
      avatar: response.url
    });

    const createdUser =await  User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong Failed to create user");
      
    }
    return res.status(201)
    .json(new ApiResponse(200, createdUser,"user register succesfully "));
   
  }

);






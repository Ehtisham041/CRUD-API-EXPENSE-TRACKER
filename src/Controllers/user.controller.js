import {User} from "../Models/user.model.js";
import {ApiError} from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import{ApiResponse} from "../Utils/ApiResponse.js";
export const registerUser = asyncHandler(async (req,res)=>
{


const {fullname,username,email,password}=req.body;

//validation
if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
}


//check if user already exists
const existingUser = await User.findOne({
    $or:[{username},{email}]
});

if(existingUser)
{
    throw new ApiError(409,"username or email already exists")
}

  // If username exists, convert to lowercase
  const normalizedUsername = username ? username.toLowerCase() : null;

const user = await User.create
({

    fullname,
  
   
    email,
    password,
    username:normalizedUsername
})


const createdUser = await User.findById(user._id).select(
"-password "
)


 if(!createdUser)
{
    throw new ApiError(500,"Failed to create user");
 }
 
 return res.status(201).json(
    new ApiResponse(200, createdUser,"SUCCESSFULLY REGISTERED USER ")
 )

 
})

export const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
  
    // Check if both username and password are provided
    if (!username || !password) {
      throw new ApiError(400, "Username and password are required");
    }
  
 
    const user = await User.findOne({ username });
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    
    const isPasswordValid = await user.isPasswordCorrect(password);
  
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid credentials");
    }
  
   
  
    // Send response with the user data 
    return res.status(200).json({
      message: "Login successful",
     
      user: {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
      },
    });
  });

  export const logoutUser = asyncHandler(async (req, res) => {
    // Clear refresh token (if stored in a cookie)
    res.clearCookie("refreshToken");
  
    // Send success message
    return res.status(200).json({ message: "Logout successful" });
  });
  
 
  
  










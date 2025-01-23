import jwt from "jsonwebtoken";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from "../Models/user.model.js";

// Middleware to verify JWT
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Get token from the request headers or cookies
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    // Decode the token to get user info
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by the decoded token's user ID
    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Add the user to the request object
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

import {Router} from "express"
const router = Router()
import { upload } from "../Middlewares/multer.middleware.js";
import { 
    registerUser,
    // loginUser ,
    // logoutUser} 
}from "../Controllers/user.controller.js";


router.route("/register").post(
    upload.single("avatar"),
    registerUser);
//router.route("/login").post(loginUser);
//router.route("/logout").post(logoutUser);

export default router;
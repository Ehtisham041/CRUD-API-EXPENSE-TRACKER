
import connectDB from "./DB/conn.js";
import dotenv from "dotenv";
dotenv.config({
});

import {app} from "./app.js"

console.log(process.env.MONGODB_URI)
connectDB()
.then(()=>{

 app.listen(process.env.PORT || 8000 ,()=>{
    console.log(`server is running on port ${process.env.PORT || 8000}`)
 })  
})
.catch((error)=>{
console.log("mongo db conn failed 'index.js' ",error);
})

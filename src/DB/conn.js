import mongoose from"mongoose"
import{DB_NAME} from "../constant.js"

const connectDB= async ()=>{

    try{
        console.log(process.env.MONGODB_URI)
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
        // console.log(conn);
        console.log(`\n MongoDB Connected db host : ${conn.connection.host}`)
    }
    catch(error){
        console.log("MONGO DB CONNECTION ERROR ",error);
        process.exit(1);
    }

}

export default connectDB;
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Configuration
cloudinary.config
({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET   
 });


const uploadOnCloudinary = async (file) =>
{
    

try
{
    console.log('Uploading file to cloudinary');
    console.log('Cloudinary Config:', process.env.CLOUDINARY_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_SECRET);

    if (!file ) throw new Error('No file received o invalid file path');
    console.log(file);
    const result = await cloudinary.uploader.upload(file.path,
    {
        resource_type: 'auto',
    });
    //file has been uploaded to cloudinary
    console.log('File uploaded successfully');
    console.log(result);
    console.log('file url ', result.url);
    return result;
    

}
catch (error) {
   // fs.unlinkSync(file);
   console.log('File upload failed');
    console.log(error.message);
    return null;

}

};
export {uploadOnCloudinary}
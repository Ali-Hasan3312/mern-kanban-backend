import { TryCatch } from "../middleware/error.js";
import { User } from "../models/auth.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";



export const registerUser = TryCatch( async (req, res, next) => {
    const { fullName, password, email } = req.body;
    if (!fullName || !password || !email) {
        throw new ErrorHandler("Please enter required fields", 400);
    }

    let image;    
   try {
     if (req.file) {
 
   const cloud_image = await uploadOnCloudinary(req.file.path);
   console.log("Cloud image response:", cloud_image);
   if(!cloud_image) {
       throw new ErrorHandler("Image upload failed", 500);
   }
   if (cloud_image?.url) {
     image = cloud_image.url;
   }
}
   } catch (error) {
        throw new ErrorHandler("Image upload failed", 500);
   } 

        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }        
        const newUser = await User.create({
            fullName,
            password,
            email,
            image
        })
        if(!newUser) {
            throw new ErrorHandler("User registration failed", 500);
        }        
         sendToken(newUser, 200, res, `Welcome ${newUser.fullName}`);
})

export const loginUser = TryCatch(async (req,res)=>{
    const { email , password } = req.body
    
    if(!email || !password){
        return new ErrorHandler("Email or Password is required",401)
    }
    const user = await User.findOne( { email } );
    if(!user) {
        throw new ErrorHandler("Invalid Email",404)
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new ErrorHandler("Invalid password",401)
    }
    sendToken(user, 200, res, `Welcome ${user.fullName}`);
})
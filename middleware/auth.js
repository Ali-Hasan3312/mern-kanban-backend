import jwt from "jsonwebtoken";
import { TryCatch } from "./error.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/auth.js";


export const verifyJwt = TryCatch(async (req, res, next) => {
     let token = req.cookies["token"] || req.session?.["token"] || req.headers["authorization"];
    if (token?.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    if (!token) {
        throw new ErrorHandler("Unauthorized access", 401);
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);

    } catch (error) {
        throw new ErrorHandler("Invalid or expired token", 401);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }
    
    req.user = user;
    return next();
})
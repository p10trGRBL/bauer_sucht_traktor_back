import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from 'jsonwebtoken';


const verifyToken = asyncHandler(async(req, res, next)=>{
//token vs cookie
//const { authorization } = req.headers;
const token = req.cookies.token;
//token version:
//if(!authorization) throw new ErrorResponse('Please login', 204);
if(!token) throw new ErrorResponse('Please login', 204);

//const decoded = jwt.verify(authorization, process.env.JWT_SECRET);
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.uid = decoded.uid;
next();
});

export default verifyToken;
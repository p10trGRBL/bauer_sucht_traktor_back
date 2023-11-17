import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//Signup
export const signUp = asyncHandler(async(req, res, next)=>{
/*
Check if user exists (email)
    -if user exists - return an error
    -if doesnt exist:
        -secure the pw with bcrypt
        -store the user in DB
        -sign a token
        -return the token
*/

const {firstName, lastName, username, email, password} = req.body;

const existingUser = await User.findOne({email});
  if (existingUser) 
    throw new ErrorResponse('An account with this email already exists', 409);

const hash = await bcrypt.hash(password, 10);

const newUser = await User.create({
    firstName,
    lastName,
    username, 
    email, 
    password: hash,
});

const token = jwt.sign({uid: newUser._id}, process.env.JWT_SECRET);
res.status(201).send({token});

});

// SignIn
export const signIn = asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body;

    const existingUser = await User.findOne({email}).select('+password');
    if (!existingUser) throw new ErrorResponse('User does not exist', 404);

    const match = await bcrypt.compare(password, existingUser.password);
    if(!match) throw new ErrorResponse('Password is incorrect', 401);

    const token = jwt.sign({uid: existingUser._id}, process.env.JWT_SECRET);
    res.status(200).send({token});
})

//User Info
export const getUser = asyncHandler(async(req,res, next)=>{
    const user = await User.findById(req.uid);
    res.json(user);
});

//Imports
import {  Router } from "express";
import { getProfileData, registerUser, sendOTP, updateAvatar, updateProfile, verifyOTP } from "../controllers/user.controller";
import {  deleteCookie, generateToken } from "../controllers/token.controller";
import { userMiddleware } from "../middlewares/user.middleware";


const userRoute = Router()


userRoute.post('/register-user',registerUser)
userRoute.post('/send-otp',sendOTP)
userRoute.post('/verify-otp',verifyOTP)
userRoute.get('/generate-token',generateToken)
userRoute.delete('/delete-cookie', deleteCookie);
userRoute.get('/get-profile-data', userMiddleware, getProfileData)
userRoute.patch('/update-profile', userMiddleware, updateProfile)
userRoute.patch('/update-avatar', userMiddleware, updateAvatar)
export {userRoute}
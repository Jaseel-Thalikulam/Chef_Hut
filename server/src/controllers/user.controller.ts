//Imports
import { Request, Response } from "express";
import { sendOTPviaMail } from "../services/nodemailer";
import { IUserRegisterValues } from "../interfaces/IUserRegisterValues";
import userModel from "../models/user.model";
import { generateOTP, usernameGenerator } from "../helpers/helpers";
import { generateAccessToken, generateRefreshToken } from "./token.controller";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/constants";
import mongoose from "mongoose";
import { IUser } from "../interfaces/IUserModel";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, contactNumber, emailId, avatarUrl }: IUserRegisterValues =
      req.body;

    if (!name || !contactNumber || !emailId || !avatarUrl)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const isUserExist =
      (await userModel
        .findOne({ email: emailId, isVerified: true })
        .countDocuments()) > 0;

    if (isUserExist)
      return res.status(409).json({ status: false, message: "User exist" });

    const otp = await generateOTP();
const username = await usernameGenerator(name)
    sendOTPviaMail(emailId, otp);

    await userModel.findOneAndUpdate(
      { email: emailId },
      {
        $set: {
          name,
          username,
          contactNumber,
          email: emailId,
          avatarUrl,
          otp: {
            code: otp,
            expiry: Date.now() + 60000,
          },
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    return res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { otp, email } = req.body;
    if (!otp || !email)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    } else if (user.otp.code !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    } else if (user.otp.expiry.getTime() < Date.now()) {
      return res.status(401).json({ success: false, message: "OTP expired" });
    }

    if (!user.isVerified) {
      await userModel.findOneAndUpdate(
        { email: email },
        { $set: { isVerified: true } }
      );
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "Successfully Verified" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });

    const isUserExist =
      (await userModel.findOne({ email: email }).countDocuments()) > 0;

    if (!isUserExist)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const otp = await generateOTP();
    sendOTPviaMail(email, otp);

    await userModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          otp: {
            code: otp,
            expiry: Date.now() + 60000,
          },
        },
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "OTP successfully sent" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getProfileData = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
 
    const objectId = new mongoose.Types.ObjectId(userId);

    const user = await userModel.aggregate([{ $match: { _id: objectId } }, { $project: { isVerified: 0, otp: 0, _id: 0 } }, { $limit: 1 }]);
    
    if (user.length < 1)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    return res.status(200).json({ success: true, user: user[0] });

  } catch (err) {
    
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



export const updateProfile =async (req:Request,res:Response) => {
  try {
    const { name, contactNumber, country, state, postalCode,bio } = req.body;
    const { userId } = req;

    
    const updateData: Partial<IUser> = { name, contactNumber, address: { country, state, postalCode } };

    if (bio) {
      updateData.bio = bio;
    }
    
    const user = await userModel.updateOne({ _id: userId }, {
      $set: updateData
    });
    
    
    if(user.matchedCount===1 && user.modifiedCount !== 1) return res.status(400).json({ success: false, message: "No changes made" })

    return res.status(200).json({ success: true, message: "Profile updated successfully" })
    
  } catch (err) {
    return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
  }
}



export const updateAvatar = async (req:Request,res:Response) => {
  try {
    const { userId } = req; 
    const {avatarUrl} = req.body;

     await userModel.updateOne({ _id: userId }, {
      $set: {avatarUrl:avatarUrl}
    });

    return res.status(200).json({ success: true, message: "Avatar updated successfully" })


  } catch (err) {
    return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
  }
}
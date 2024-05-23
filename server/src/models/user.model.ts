import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/IUserModel";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true, unique: true },
  avatarUrl: { type: String, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  bio: { type: String, required: false },
  address: {
    country: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false },
  },
  otp: {
    code: { type: String, required: true },
    expiry: { type: Date,required: true}
  }
});

export default model<IUser>("User", UserSchema, "User");

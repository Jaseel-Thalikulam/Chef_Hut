import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  contactNumber: string;
  avatarUrl: string;
  isVerified: boolean;
  address:{country: string;
  state: string;
  postalCode: string;}
  bio?: string;
  otp: {
    code: string;
    expiry: Date;
  };
}

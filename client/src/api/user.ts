import axios from "axios";
import {
  PublicURLCreator,
  showErrorMessage,
  showSuccessMessage,
} from "../helpers/helpers";
import { IUserRegisterValues } from "../interfaces/IUserRegisterValues";
import { ISendOTP } from "../interfaces/ISendOTP";
import { customAxios } from "../interceptor/interceptor";
import { IUser } from "../interfaces/IUser";

export const registerUser = async (values: IUserRegisterValues) => {
  const url = await PublicURLCreator("register-user");
  return axios.post(url, { ...values });
};

export const verifyOTP = async (values: { otp: string; email: string }) => {
  const url = await PublicURLCreator("verify-otp");

  return await axios.post(url, values, {
    withCredentials: true,
  });
};

export const sendOTP = async ({ email, setSeconds }: ISendOTP) => {
  try {
    if (!email) return;
    setSeconds(60);
    const url = await PublicURLCreator("send-otp");
    const res = await axios.post(url, { email });
    showSuccessMessage(res);
  } catch (err) {
    setSeconds(0);
    showErrorMessage(err);
  }
};

export const generateRefreshToken = async () => {
  try {
    await customAxios.get("/generate-token", {
      withCredentials: true,
    });
  } catch (err) {
    showErrorMessage(err);
  }
};

export const getProfileData = async () => {
  try {
    return await customAxios.get("/get-profile-data", {
      withCredentials: true,
    });
  } catch (err) {
    showErrorMessage(err);
  }
};

export const deleteCookie = async () => {
  customAxios.delete('delete-cookie',{withCredentials:true})
};


export const updateProfile = async (values:IUser) => {
  return await customAxios.patch('update-profile',values,{withCredentials:true})
}


export const updateProfileImage = async (avatarUrl: string) => {
  return await customAxios.patch('/update-avatar',avatarUrl,{withCredentials:true})
}
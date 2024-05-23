import jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN, JWT_SECRET } from "../constants/constants";
import { Request, Response } from "express";

export const generateAccessToken = (id: unknown) => {
  return jwt.sign({id }, JWT_SECRET, { expiresIn: "20s" });
};
export const generateRefreshToken = (id: unknown) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

export const generateToken = (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken as string;
    if (!refreshToken) {
      
      return res
      .status(401)
      .json({ success: false, message: "Verification failed" });
    }

      jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
      if (err) {
        
        return res
        .status(401)
        .json({ success: false, message: "Verification failed" });
        
      }
                const userId = decoded as JwtPayload;
        
         const accessToken = generateAccessToken(userId!.id);
 
       return res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, secure: true }).status(200).json({success:true,message:"Token Refreshed Successfully"});
        
 
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



export const deleteCookie = async (req: Request, res: Response) => {
  res.cookie('refreshToken', '', { maxAge: 0 });
  res.cookie('accessToken', '', { maxAge: 0 });
  return res.end();
}

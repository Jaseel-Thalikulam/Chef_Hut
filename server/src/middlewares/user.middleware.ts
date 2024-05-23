import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "../constants/constants";


  
export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
     
        const  accessToken = req.cookies.accessToken as string ;
        if (!accessToken) return res.status(403).json({ success: false, message: "User not authorized" })
        
        jwt.verify(accessToken, JWT_SECRET, (err, userId) => {
            if (err) return res.status(403).json({ success: false, message: "Verification failed" }) 
                if (isJwtPayload(userId)) {
                    req.userId = userId.id;
                }
            next();
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({status:false,message:"Internal server error"})
    }
}



function isJwtPayload(object: string | JwtPayload | undefined): object is JwtPayload {
    if (typeof object === 'object' && object !== null) {
        return 'id' in object;
    }
    return false;
}
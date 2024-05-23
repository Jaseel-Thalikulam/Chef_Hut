//Imports
import dotenv from 'dotenv'

//.env config
dotenv.config()

//Exporting environment variable 
export const PORT = process.env.PORT as string
export const CLIENT_URL = process.env.CLIENT_URL as string
export const MONGODB_URL= process.env.MONGODB_URL as string
export const GMAIL= process.env.GMAIL as string
export const NODEMAILER_APP_PASSWORD= process.env.NODEMAILER_APP_PASSWORD as string
export const JWT_SECRET = process.env.JWT_SECRET as string
export const ACCESS_TOKEN ="accessToken"
export const REFRESH_TOKEN ="refreshToken"

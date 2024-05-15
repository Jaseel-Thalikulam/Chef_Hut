//Imports
import dotenv from 'dotenv'

//.env config
dotenv.config()

//Exporting environment variable 
export const PORT = process.env.PORT as string
export const CLIENT_URI = process.env.CLIENT_URI as string


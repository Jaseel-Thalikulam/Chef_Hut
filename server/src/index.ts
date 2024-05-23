//Imports
import express from 'express'
import cors from 'cors'
import { userRoute } from './routes/user.route'
import { CLIENT_URL, MONGODB_URL, PORT } from './constants/constants'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'


//Creating instance of express
const app = express()


// CORS setup
const corsOptions = {
    origin: CLIENT_URL,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  };


app.use(cors(corsOptions));

app.use(express.json())

app.use(cookieParser());

//User route
app.use('/',userRoute)

//MongoDB Config
mongoose.connect(MONGODB_URL).then(() => {
    console.log("Database connected");
  }).catch((err: Error) => {
    console.error(err);
  });


app.listen(PORT, () => {

    console.log(`Server running@${PORT}`);
    
})


  
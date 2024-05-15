//Imports
import express from 'express'
import cors from 'cors'
import { userRoute } from './routes/user-route'
import { CLIENT_URI, PORT } from './constants/constants'



//Creating instance of express
const app = express()


// CORS setup
const corsOptions = {
    origin: CLIENT_URI,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
  };


app.use(cors(corsOptions));


//User route
app.use('/',userRoute)




app.listen(PORT, () => {

    console.log(`Server running@${PORT}`);
    
})
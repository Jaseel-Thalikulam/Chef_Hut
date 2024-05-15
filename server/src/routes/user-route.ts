//Imports
import { Router } from "express";
import { sayHello } from "../controllers/user-controller";

const userRoute = Router()

userRoute.get('/sayHello',sayHello)


export {userRoute}
import { Router } from "express";
import { getMe } from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.get("/me", getMe )

export { userRouter };

import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers).post("/", createUser).get("/:id", getUserById);

export { userRouter };

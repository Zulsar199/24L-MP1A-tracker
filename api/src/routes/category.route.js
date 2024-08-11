import { Router } from "express";
import { createCategory, getAllCategories, getCategoryById } from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories).post("/", createCategory).get("/:id", getCategoryById)

export {categoryRouter}
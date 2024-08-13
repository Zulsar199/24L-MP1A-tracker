import { Router } from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
} from "../controllers/record.controller.js";

const recordRouter = Router();

recordRouter
  .get("/", getAllRecords)
  .post("/", createRecord)
  .get("/:id", getRecordById);

export { recordRouter };

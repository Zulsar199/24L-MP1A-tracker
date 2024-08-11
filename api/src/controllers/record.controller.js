import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllRecords = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "records.json");
    const rawData = fs.readFileSync(filePath);
    const records = JSON.parse(rawData);

    res.json(records);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRecordById = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "records.json");
    const rawData = fs.readFileSync(filePath);
    const records = JSON.parse(rawData);

    const id = req.params.id;
    const record = records.find((el) => el.id === id);

    if (record) {
      res.json(record);
    } else {
      res.status(404).json({ error: "Record not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createRecord = async (req, res) => {
  console.log(req.body, "++++");
  
  try {
    const filePath = path.join(__dirname, "..", "data", "records.json");
    const rawData = fs.readFileSync(filePath);
    const records = JSON.parse(rawData);

    const newRecord = { ...req.body, id: v4() };
    console.log(newRecord, "++++++");
    
    records.push(newRecord);

    fs.writeFileSync(filePath, JSON.stringify(records));

    res.json(newRecord);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

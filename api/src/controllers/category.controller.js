import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllCategories = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "categories.json");
    const rawData = fs.readFileSync(filePath);
    const categories = JSON.parse(rawData);

    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "categories.json");
    const rawData = fs.readFileSync(filePath);
    const categories = JSON.parse(rawData);

    const id = req.params.id;
    const category = categories.find((el) => el.id === id);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "categories.json");
    const rawData = fs.readFileSync(filePath);
    const categories = JSON.parse(rawData);

    const newCategory = { ...req.body, id: v4() };
    categories.push(newCategory);

    fs.writeFileSync(filePath, JSON.stringify(categories));

    res.json(newCategory);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

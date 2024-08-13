import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllUsers = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "users.json");
    const rawData = fs.readFileSync(filePath);
    const users = JSON.parse(rawData);

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "users.json");
    const rawData = fs.readFileSync(filePath);
    const users = JSON.parse(rawData);

    const id = req.params.id;
    const user = users.find((el) => el.id === id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "data", "users.json");
    const rawData = fs.readFileSync(filePath);
    const users = JSON.parse(rawData);

    const newUser = { ...req.body, id: v4() };
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users));

    res.json(newUser);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

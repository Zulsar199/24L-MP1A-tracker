import { readJson, saveJson } from "../utils/index.js";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const users = readJson("users.json");

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const users = readJson("user.json");

  const user = user.find((user) => user.email === email);

  if (user) return res.status(400).json({ message: "User already exists" });

  const newUser = {
    id: v4(),
    name,
    email,
    password,
  };

  users.push(newUser);

  saveJson("users.json", users);

  res.json(newUser);
};

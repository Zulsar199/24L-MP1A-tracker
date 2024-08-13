import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import { categoryRouter } from "./src/routes/category.route.js";
import { recordRouter } from "./src/routes/record.route.js";
import { userRouter } from "./src/routes/user.route.js";
import { authRouter } from "./src/routes/auth.route.js";

const app = express();
const port = 5000;
dotenv.config()

app.use(cors());
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/record", recordRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

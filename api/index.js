import express from "express";
import cors from "cors";
import { categoryRouter } from "./src/routes/category.route.js";
import { recordRouter } from "./src/routes/record.route.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/category", categoryRouter);
app.use("/record", recordRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

import express from "express";
import dotenv from "dotenv";
import connectDb from "./src/config/dbConfig.js";
import todoRoute from "./src/routes/todoRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  console.log("reached Server");
  res.send("this is server");
});

app.use("/api/v1", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

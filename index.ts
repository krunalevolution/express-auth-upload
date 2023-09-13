import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// configs
import mongoConnect from "./config/mongoDB";

// controllers
import userController from "./controllers/userController";
import imageUploadController from "./controllers/imageUploadController";

// env config
dotenv.config();

// PORT & Database
const PORT = process.env.PORT as string;
const DATABASE_URL = process.env.DATABASE_URL as string;

const app = express();

// database connection
mongoConnect(DATABASE_URL);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/user/", userController);
app.use("/api/user/", imageUploadController);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

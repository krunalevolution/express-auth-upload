import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// configs
import mongoConnect from "./config/mongoDB";
import userController from "./controllers/userController";
import imageUploadController from "./controllers/imageUploadController";

// env config
dotenv.config();

// PORT
const PORT = process.env.PORT as string;
const DATABASE_URL = process.env.DATABASE_URL as string;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// database connection
mongoConnect(DATABASE_URL);

// routes
app.use("/api/user/", userController);
app.use("/api/user/", imageUploadController);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

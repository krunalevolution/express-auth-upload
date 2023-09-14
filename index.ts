import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";

// configs
import mongoConnect from "./config/mongoDB";

// env config
dotenv.config();

// PORT & Database
const PORT = process.env.PORT as string;
const DATABASE_URL = process.env.DATABASE_URL as string;

// controllers
import userController from "./controllers/userController";
import imageUploadController from "./controllers/imageUploadController";
import generateExcelController from "./controllers/generateExcelController";

const app = express();

// handlebar views
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// database connection
mongoConnect(DATABASE_URL);

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/user/", userController);
app.use("/api/user/", imageUploadController);
app.use("/api/user/", generateExcelController);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

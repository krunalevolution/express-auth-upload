import express, { Request, Response } from "express";
import multer from "multer";
import ImageUpload from "../models/imageupload";
import checkUserAuth from "../middlewares/authMiddleware";

const router = express.Router();

// storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// multer instance
const upload = multer({ storage: storage });

// User Upload Image
router.post(
  "/upload",
  checkUserAuth,
  upload.single("file"),
  async (req: Request, res: Response) => {
    // Handle the uploaded file
    const url = process.cwd() + "/" + req.file?.path;
    // regsiter new user

    const imageUrl = await new ImageUpload({
      imageurl: url,
    });
    await imageUrl.save();
    res.json({ message: "File uploaded successfully!" });
  }
);

// Get All Images
router.get("/images", async (req, res) => {
  try {
    const result = await ImageUpload.find();
    res.send({
      status: "success",
      result: result,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Something went wrong!",
    });
  }
});

// Delete Single Image
router.delete("/image/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ImageUpload.findByIdAndDelete(id);
    res.send({
      status: "success",
      message: "Image Deleted",
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Something went wrong!",
    });
  }
});

export default router;

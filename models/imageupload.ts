import mongoose from "mongoose";

// user Schema

const imageUploadSchema = new mongoose.Schema({
  imageurl: { type: String, required: true, trim: true },
});

// creating model
const ImageUpload = mongoose.model("imageupload", imageUploadSchema);

// exporting model
export default ImageUpload;

import mongoose from "mongoose";

// user Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  isverified: { type: Boolean },
  uniquestring: { type: String, trim: true },
});

// creating model
const UserModel = mongoose.model("user", userSchema);

// exporting model
export default UserModel;

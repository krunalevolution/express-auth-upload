import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import UserModel from "../models/user";
import checkUserAuth from "../middlewares/authMiddleware";

const router = express.Router();

// User Registration
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({
        status: "failed",
        message: "User already exist!",
      });
    } else {
      if (name && email && password) {
        try {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password, salt);

          // regsiter new user
          const user = await new UserModel({
            name: name,
            email: email,
            password: hashPassword,
          });
          await user.save();

          //   generating token
          const token = jwt.sign(
            { userID: user._id },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: "5d" }
          );

          res.status(201).send({
            status: "success",
            message: "User register succesfully!",
            token: token,
          });
        } catch (error) {
          res.send({
            status: "failed",
            message: "Unable to register new user!",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All fields are required!",
        });
      }
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Something went wront with registration!",
    });
  }
});

// User Login

router.post("/login", checkUserAuth, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user: any = await UserModel.findOne({ email: email });
      const isPassMatch = await bcrypt.compare(password, user.password);
      if (user.email === email && isPassMatch) {
        // genrating jwt token
        const token = jwt.sign(
          { userID: user._id },
          `${process.env.JWT_SECRET_KEY}`,
          { expiresIn: "5d" }
        );

        res.send({
          status: "success",
          message: "Login Succesfully!",
          token: token,
        });
      } else {
        res.send({
          status: "failed",
          message: "Please enter valid email & password!",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "All fields are required!",
      });
    }
  } catch (error) {
    res.send({
      status: "failed",
      message: "Something went wront with login!",
    });
  }
});

export default router;

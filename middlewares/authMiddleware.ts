const jwt = require("jsonwebtoken");

// Importing User Model
import UserModel from "../models/user";

// Check User Authenticate
const checkUserAuth = async (req: any, res: any, next: any) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      // Get Token From Headers
      token = authorization.split(" ")[1];
      // Verify Token
      const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      // Get user from token
      req.user = await UserModel.findById(userID).select("-password");

      next();
    } else {
      res.send({
        status: "failed",
        message: "Unauthorized User, Token Not Found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Token Is Not Valid!" });
  }
};

export default checkUserAuth;

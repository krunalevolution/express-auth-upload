import express, { Request, Response } from "express";
import UserModel from "../models/user";

// export function
import exportExcelFile from "../config/exportExcelFile";

const router = express.Router();

// Export excel of verified users

router.get("/exportcsv", async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find({ isverified: true });
    exportExcelFile(user);
    const excelPath = process.cwd() + "\\" + "Verifieduserslist.csv";
    res.send({
      status: "success",
      message: "Excel file generated",
      path: excelPath,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Something went wront with exporting file!",
    });
  }
});

export default router;

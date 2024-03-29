import { Request, Response, NextFunction } from "express";
import CustomError from "../Helper/customError";

const errorHandlingMidleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.statusCode === 404) {
    res
      .status(err.statusCode)
      .json({ errors: err.status, errorMessage: err.message });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

export default errorHandlingMidleware;
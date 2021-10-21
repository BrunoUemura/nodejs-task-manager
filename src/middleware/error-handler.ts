import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../errors/custom-error";

const errorHandlerMiddleware = (
  err: any,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return response.status(err.statusCode).json({ msg: err.message });
  }
  return response
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
};

export { errorHandlerMiddleware };

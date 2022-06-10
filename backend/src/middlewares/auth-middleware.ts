import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import tokenService from "../services/token-service";

export interface IGetUserAuthInfoRequest extends Request {
  user: JwtPayload; // or any other type
}

export default async function (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = tokenService.verifyAccessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData as JwtPayload;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    console.log(error);
  }
}

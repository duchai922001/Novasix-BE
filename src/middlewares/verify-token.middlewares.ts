import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../infrastructure/model/user.model";
import { UnauthorizedException } from "../domain/exceptions/unauthorized.exception";
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IUser;
    const user = await User.findById(decoded.id);

    // if (!user) {
    //   throw new UnauthorizedException("User not found");
    // }

    // // Lấy deviceId từ headers
    // const deviceIdFromClient = req.headers["device-id"] as string;

    // // Kiểm tra deviceId có khớp không
    // if (user.deviceId && user.deviceId !== deviceIdFromClient) {
    //   throw new UnauthorizedException("Session expired, login again");
    // }

    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log({ error });
    next(new UnauthorizedException("Invalid token or expired token"));
  }
};

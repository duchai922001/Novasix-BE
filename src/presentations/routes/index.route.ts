import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../domain/exceptions/not-found.exception";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import authRoutes from "./auth.route";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";
import { HttpException } from "../../domain/exceptions/http.exception";

export const initRoutes = (app: any) => {
  app.use("/", authRoutes);
  app.use("*", (req: Request, res: Response) => {
    const notFoundException = new NotFoundException("Endpoint không tìm thấy");
    res.status(HttpStatus.NOT_FOUND).json(notFoundException.toResponse());
  });
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err?.name === "MongoServerError") {
      const badRequestException = new BadRequestException(err.message);
      res.status(HttpStatus.BAD_REQUEST).json(badRequestException.toResponse());
    }
    if (err instanceof HttpException) {
      res.status(err.status).json(err.toResponse());
    }
    res.status(500).json({ message: err?.message || "Internal server error" });
  });
};

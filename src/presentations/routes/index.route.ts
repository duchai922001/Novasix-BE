import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../domain/exceptions/not-found.exception";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import authRoutes from "./auth.route";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";
import { HttpException } from "../../domain/exceptions/http.exception";
import dailyTaskRoutes from "./daily.route";
import weeklyTaskRoutes from "./week.route";
import monthlyEventRoutes from "./monthly.route";
import sentenceRoutes from "./sentence.route";
import quoteRoutes from "./quote.route";
import pomodoroRoutes from "./pomodoro.route";

export const initRoutes = (app: any) => {
  app.use("/", authRoutes);
  app.use("/daily-task", dailyTaskRoutes);
  app.use("/weekly-task", weeklyTaskRoutes);
  app.use("/monthly-event", monthlyEventRoutes);
  app.use("/sentence", sentenceRoutes);
  app.use("/quote", quoteRoutes);
  app.use("/pomodoro", pomodoroRoutes);
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

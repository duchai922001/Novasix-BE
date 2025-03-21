import { Request, Response } from "express";
import { TaskUsageService } from "../../services/task-usage.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const TaskUsageController = {
  logTaskUsage: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const formData = {
      ...req.body,
      userId: user.userId,
    };
    const data = await TaskUsageService.logTaskUsage(formData);
    return res.json(
      successResponse(HttpStatus.OK, "Log thời gian thành công", data)
    );
  },
  getMostActiveHour: async (req: Request, res: Response) => {
    const user = res.locals.user;

    const data = await TaskUsageService.getMostActiveHour(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getTaskUsageByHour: async (req: Request, res: Response) => {
    const user = res.locals.user;

    const data = await TaskUsageService.getTaskUsageByHour(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getTaskUsageByWeek: async (req: Request, res: Response) => {
    const user = res.locals.user;

    const data = await TaskUsageService.getTaskUsageByWeek(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getTaskUsageByMonth: async (req: Request, res: Response) => {
    const user = res.locals.user;

    const data = await TaskUsageService.getTaskUsageByMonth(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getTaskUsageByYear: async (req: Request, res: Response) => {
    const user = res.locals.user;

    const data = await TaskUsageService.getTaskUsageByYear(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

import { Request, Response } from "express";
import { DashboardService } from "../../services/dashboard.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const DashboardController = {
  getDashboardDaily: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await DashboardService.getDashboardDaily(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getDashboardWeekly: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await DashboardService.getDashboardWeekly(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getDashboardMonthly: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await DashboardService.getDashboardMonthly(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getDashboardYearly: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await DashboardService.getDashboardYearly(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

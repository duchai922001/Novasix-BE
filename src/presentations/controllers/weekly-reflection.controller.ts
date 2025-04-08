import { Request, Response } from "express";
import { WeeklyReflectionService } from "../../services/weekly-reflection.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const WeeklyReflectionController = {
  create: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const data = await WeeklyReflectionService.create(payload);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", data));
  },
  getWeekReflection: async (req: Request, res: Response) => {
    const { dateWeek } = req.query;
    const user = res.locals.user;
    if (!dateWeek || typeof dateWeek !== "string") {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Ngày không hợp lệ" });
    }
    const data = await WeeklyReflectionService.getWeekReflection(
      user.userId,
      dateWeek
    );
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

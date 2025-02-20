import { Request, Response } from "express";
import { WeeklyService } from "../../services/weekly.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const WeeklyTaskController = {
  createTaskWeek: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const newTaskWeek = await WeeklyService.createTaskWeek(payload);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(
          HttpStatus.CREATED,
          "Tạo task tuần thành công",
          newTaskWeek
        )
      );
  },
  getTaskWeek: async (req: Request, res: Response) => {
    const { dateWeek } = req.query;
    const user = res.locals.user;
    if (!dateWeek || typeof dateWeek !== "string") {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Ngày không hợp lệ" });
    }
    const tasksWeek = await WeeklyService.getWeeklyTask(user.userId, dateWeek);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", tasksWeek)
    );
  },
  updateWeeklyTask: async (req: Request, res: Response) => {
    const { weeklyTaskId } = req.params;
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const updateTask = await WeeklyService.updateWeeklyTask(
      weeklyTaskId,
      payload
    );
    return res.json(
      successResponse(HttpStatus.OK, "Cập nhật thành công", updateTask)
    );
  },
};

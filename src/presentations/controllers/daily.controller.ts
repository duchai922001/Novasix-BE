import { Request, Response } from "express";
import { DailyTaskService } from "../../services/daily.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const DailyTaskController = {
  createDailyTask: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const newTask = await DailyTaskService.createDailyTask(payload);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", newTask));
  },

  updateDailyTask: async (req: Request, res: Response) => {
    const { dailyTaskId } = req.params;
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const updateTask = await DailyTaskService.updateDailyTask(
      dailyTaskId,
      payload
    );
    return res.json(
      successResponse(HttpStatus.OK, "Cập nhật thành công", updateTask)
    );
  },
  deleteDailyTask: async (req: Request, res: Response) => {
    const { dailyTaskId } = req.params;
    await DailyTaskService.deleteDailyTask(dailyTaskId);
    return res.json(successResponse(HttpStatus.OK, "Xóa task thành công"));
  },
  getTaskDaily: async (req: Request, res: Response) => {
    const { date } = req.query;
    const user = res.locals.user;
    if (!date || typeof date !== "string") {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Ngày không hợp lệ" });
    }
    const taskDaily = await DailyTaskService.getTaskDaily(user.userId, date);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", taskDaily)
    );
  },
  getTaskDoneDaily: async (req: Request, res: Response) => {
    const { date } = req.query;

    const user = res.locals.user;
    if (!date || typeof date !== "string") {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Ngày không hợp lệ" });
    }
    const taskDoneDaily = await DailyTaskService.getTaskDoneDaily(
      user.userId,
      date
    );
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", taskDoneDaily)
    );
  },

  getTaskById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await DailyTaskService.getTaskById(id);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

import { Request, Response } from "express";
import { PomodoroService } from "../../services/pomodoro.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const PomodoroController = {
  createPomodoro: async (req: Request, res: Response) => {
    const newPomodoro = await PomodoroService.createPomodoro(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", newPomodoro));
  },
  getPomodoroByUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await PomodoroService.getPomodoroByUser(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

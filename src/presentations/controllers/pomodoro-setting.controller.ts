import { Request, Response } from "express";
import { PomodoroSettingService } from "../../services/pomodoro-setting.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const PomodoroSettingController = {
  create: async (req: Request, res: Response) => {
    const data = await PomodoroSettingService.create(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", data));
  },
  getAll: async (req: Request, res: Response) => {
    const data = await PomodoroSettingService.getAll();
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await PomodoroSettingService.update(id, req.body);
    return res.json(
      successResponse(HttpStatus.OK, "Cập nhật thành công", data)
    );
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await PomodoroSettingService.delete(id);
    return res.json(successResponse(HttpStatus.OK, "Xóa thành công", data));
  },
};

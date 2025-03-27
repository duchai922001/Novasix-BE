import { Request, Response } from "express";
import { UserService } from "../../services/user.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const UserController = {
  updateMissionUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await UserService.updateMissionUser(user.userId, req.body);
    return res.json(
      successResponse(HttpStatus.OK, "Cập nhật thành công", data)
    );
  },
  getUserCurrent: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await UserService.getUserCurrent(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  updateUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await UserService.updateUser(user.userId, req.body);
    return res.json(
      successResponse(HttpStatus.OK, "Cập nhật thành công", data)
    );
  },
  getAllUser: async (req: Request, res: Response) => {
    const data = await UserService.getAllUser();
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  actionIsActiveUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await UserService.actionIsActiveUser(id);
    if (data?.action === "banned") {
      return res.json(
        successResponse(
          HttpStatus.OK,
          `Chặn người dùng ${data.username} thành công`
        )
      );
    }
    if (data?.action === "unbanned") {
      return res.json(
        successResponse(
          HttpStatus.OK,
          `Mở khóa người dùng ${data.username} thành công`
        )
      );
    }
  },
};

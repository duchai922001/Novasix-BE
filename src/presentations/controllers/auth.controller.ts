import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const payload = req.body;
    const newUser = await AuthService.register(payload);
    return res.json(
      successResponse(HttpStatus.CREATED, "Đăng ký thành công", newUser)
    );
  },
  login: async (req: Request, res: Response) => {
    const payload = req.body;
    const user = await AuthService.login(payload);
    return res.json(
      successResponse(HttpStatus.OK, "Đăng nhập thành công", user)
    );
  },
};

import { Request, Response } from "express";
import { AuthService } from "../../services/auth.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import Pomodoro from "../../infrastructure/model/pomodoro.model";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    const payload = req.body;
    const newUser = await AuthService.register(payload);
    if (newUser) {
      const payload = {
        userId: String(newUser._id) ?? "",
        pomodoroTimer: 25,
        breakTimer: 5,
      };
      const newPomodoro = new Pomodoro(payload);

      await newPomodoro.save();
    }
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

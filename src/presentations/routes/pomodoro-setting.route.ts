import { Router } from "express";

import { catchAsync } from "../../utils/catchAsync.util";

import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { PomodoroSettingController } from "../controllers/pomodoro-setting.controller";

const pomodoroSettingRoutes = Router();

pomodoroSettingRoutes.post(
  "/create",
  verifyToken,

  catchAsync(PomodoroSettingController.create)
);
pomodoroSettingRoutes.get(
  "/get-all",
  verifyToken,
  catchAsync(PomodoroSettingController.getAll)
);
pomodoroSettingRoutes.delete(
  "/delete/:id",
  verifyToken,
  catchAsync(PomodoroSettingController.delete)
);
pomodoroSettingRoutes.put(
  "/update/:id",
  verifyToken,
  catchAsync(PomodoroSettingController.update)
);
export default pomodoroSettingRoutes;

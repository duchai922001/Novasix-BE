import { Router } from "express";

import { catchAsync } from "../../utils/catchAsync.util";

import { PomodoroController } from "../controllers/pomodoro.controller";
import { verifyToken } from "../../middlewares/verify-token.middlewares";

const pomodoroRoutes = Router();

pomodoroRoutes.post("/create", catchAsync(PomodoroController.createPomodoro));
pomodoroRoutes.get(
  "/user",
  verifyToken,
  catchAsync(PomodoroController.getPomodoroByUser)
);

export default pomodoroRoutes;

import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { WeeklyTaskController } from "../controllers/weekly.controller";
import { WeeklyTaskDTO } from "../dtos/weekly/weekly-task.dto";
import { verifyToken } from "../../middlewares/verify-token.middlewares";

const weeklyTaskRoutes = Router();

weeklyTaskRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(WeeklyTaskDTO),
  catchAsync(WeeklyTaskController.createTaskWeek)
);
weeklyTaskRoutes.put(
  "/update/:weeklyTaskId",
  verifyToken,
  transformAndValidate(WeeklyTaskDTO),
  catchAsync(WeeklyTaskController.updateWeeklyTask)
);
weeklyTaskRoutes.get(
  "/",
  verifyToken,
  catchAsync(WeeklyTaskController.getTaskWeek)
);

export default weeklyTaskRoutes;

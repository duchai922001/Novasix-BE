import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { TaskUsageController } from "../controllers/task-usage.controller";

const taskUsageRoutes = Router();

taskUsageRoutes.post(
  "/log-time",
  verifyToken,
  catchAsync(TaskUsageController.logTaskUsage)
);
taskUsageRoutes.get(
  "/time-most",
  verifyToken,
  catchAsync(TaskUsageController.getMostActiveHour)
);
taskUsageRoutes.get(
  "/statistical-day",
  verifyToken,
  catchAsync(TaskUsageController.getTaskUsageByHour)
);
taskUsageRoutes.get(
  "/statistical-week",
  verifyToken,
  catchAsync(TaskUsageController.getTaskUsageByWeek)
);
taskUsageRoutes.get(
  "/statistical-month",
  verifyToken,
  catchAsync(TaskUsageController.getTaskUsageByMonth)
);
taskUsageRoutes.get(
  "/statistical-year",
  verifyToken,
  catchAsync(TaskUsageController.getTaskUsageByYear)
);
export default taskUsageRoutes;

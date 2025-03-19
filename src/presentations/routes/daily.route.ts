import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { DailyTaskDTO } from "../dtos/daily/daily-task.dto";
import { DailyTaskController } from "../controllers/daily.controller";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { UpdateDailyTaskDTO } from "../dtos/daily/update.dto";

const dailyTaskRoutes = Router();

dailyTaskRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(DailyTaskDTO),
  catchAsync(DailyTaskController.createDailyTask)
);

dailyTaskRoutes.put(
  "/update/:dailyTaskId",
  verifyToken,
  transformAndValidate(UpdateDailyTaskDTO),
  catchAsync(DailyTaskController.updateDailyTask)
);

dailyTaskRoutes.delete(
  "/delete/:dailyTaskId",
  verifyToken,
  catchAsync(DailyTaskController.deleteDailyTask)
);

dailyTaskRoutes.get(
  "/progress",
  verifyToken,
  catchAsync(DailyTaskController.getTaskDaily)
);
dailyTaskRoutes.get(
  "/get-task/:id",
  verifyToken,
  catchAsync(DailyTaskController.getTaskById)
);
dailyTaskRoutes.get(
  "/done",
  verifyToken,
  catchAsync(DailyTaskController.getTaskDoneDaily)
);

export default dailyTaskRoutes;

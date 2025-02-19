import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { DailyTaskDTO } from "../dtos/daily/daily-task.dto";
import { DailyTaskController } from "../controllers/daily.controller";

const dailyTaskRoutes = Router();

dailyTaskRoutes.post(
  "/create",
  transformAndValidate(DailyTaskDTO),
  catchAsync(DailyTaskController.createDailyTask)
);

dailyTaskRoutes.put(
  "/update/:dailyTaskId",
  transformAndValidate(DailyTaskDTO),
  catchAsync(DailyTaskController.updateDailyTask)
);

dailyTaskRoutes.delete(
  "/delete/:dailyTaskId",
  catchAsync(DailyTaskController.deleteDailyTask)
);

dailyTaskRoutes.get("/progress", catchAsync(DailyTaskController.getTaskDaily));
dailyTaskRoutes.get("/done", catchAsync(DailyTaskController.getTaskDoneDaily));

export default dailyTaskRoutes;

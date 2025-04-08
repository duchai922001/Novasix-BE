import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { WeeklyReflectionController } from "../controllers/weekly-reflection.controller";

const weeklyReflectionRoutes = Router();

weeklyReflectionRoutes.post(
  "/create",
  verifyToken,
  catchAsync(WeeklyReflectionController.create)
);
weeklyReflectionRoutes.get(
  "/",
  verifyToken,
  catchAsync(WeeklyReflectionController.getWeekReflection)
);

export default weeklyReflectionRoutes;

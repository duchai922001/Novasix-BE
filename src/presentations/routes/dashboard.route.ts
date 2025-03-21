import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { DashboardController } from "../controllers/dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.get(
  "/daily",
  verifyToken,
  catchAsync(DashboardController.getDashboardDaily)
);
dashboardRoutes.get(
  "/weekly",
  verifyToken,
  catchAsync(DashboardController.getDashboardWeekly)
);
dashboardRoutes.get(
  "/monthly",
  verifyToken,
  catchAsync(DashboardController.getDashboardMonthly)
);
dashboardRoutes.get(
  "/yearly",
  verifyToken,
  catchAsync(DashboardController.getDashboardYearly)
);

export default dashboardRoutes;

import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { MonthEventDTO } from "../dtos/monthly/event-month.dto";
import { MonthlyEventController } from "../controllers/monthly.controller";
import { verifyToken } from "../../middlewares/verify-token.middlewares";

const monthlyEventRoutes = Router();

monthlyEventRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(MonthEventDTO),
  catchAsync(MonthlyEventController.createEvent)
);
monthlyEventRoutes.get(
  "/",
  verifyToken,
  catchAsync(MonthlyEventController.getEventMonthly)
);

export default monthlyEventRoutes;

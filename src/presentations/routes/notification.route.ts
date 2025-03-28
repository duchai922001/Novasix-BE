import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import {
  getNotifications,
  markNotificationsAsRead,
  sendNotification,
} from "../controllers/notification.controller";

const notificationRoutes = Router();

notificationRoutes.post("/send", verifyToken, catchAsync(sendNotification));

notificationRoutes.get("/", verifyToken, catchAsync(getNotifications));
notificationRoutes.put(
  "/mark",
  verifyToken,
  catchAsync(markNotificationsAsRead)
);
export default notificationRoutes;

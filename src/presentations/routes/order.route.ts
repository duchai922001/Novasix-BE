import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { OrderController } from "../controllers/order.controller";

const orderRoutes = Router();

orderRoutes.post(
  "/create",
  verifyToken,
  catchAsync(OrderController.createOrder)
);
orderRoutes.get("/", verifyToken, catchAsync(OrderController.getOrdersByUser));

export default orderRoutes;

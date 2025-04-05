import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { PaymentController } from "../controllers/payment.controller";

const paymentRoutes = Router();

paymentRoutes.post(
  "/create",
  // verifyToken,
  catchAsync(PaymentController.createPayment)
);
// paymentRoutes.post("/callback", catchAsync(PaymentController.callback));

export default paymentRoutes;

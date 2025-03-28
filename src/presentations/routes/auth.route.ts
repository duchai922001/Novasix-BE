import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import { AuthController } from "../controllers/auth.controller";
import { LoginDTO } from "../dtos/auth/login.dto";
import { verifyToken } from "../../middlewares/verify-token.middlewares";

const authRoutes = Router();

authRoutes.post(
  "/register",
  transformAndValidate(RegisterDTO),
  catchAsync(AuthController.register)
);

authRoutes.post(
  "/login",
  transformAndValidate(LoginDTO),
  catchAsync(AuthController.login)
);
authRoutes.post("/logout", verifyToken, catchAsync(AuthController.logout));
export default authRoutes;

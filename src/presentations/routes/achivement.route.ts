import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { RegisterDTO } from "../dtos/auth/register.dto";
import { catchAsync } from "../../utils/catchAsync.util";
import { AuthController } from "../controllers/auth.controller";
import { LoginDTO } from "../dtos/auth/login.dto";

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

export default authRoutes;

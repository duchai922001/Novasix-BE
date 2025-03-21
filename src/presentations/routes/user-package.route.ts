import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { UserPackageController } from "../controllers/user-package.controller";

const userPackageRoutes = Router();

userPackageRoutes.post(
  "/buy",
  verifyToken,
  catchAsync(UserPackageController.buyPackage)
);
userPackageRoutes.get(
  "/",
  verifyToken,
  catchAsync(UserPackageController.getPackagesUser)
);

export default userPackageRoutes;

import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post(
  "/update-mission",
  verifyToken,
  catchAsync(UserController.updateMissionUser)
);

userRoutes.get(
  "/current",
  verifyToken,
  catchAsync(UserController.getUserCurrent)
);
userRoutes.put("/update", verifyToken, catchAsync(UserController.updateUser));
userRoutes.get("/get-all", verifyToken, catchAsync(UserController.getAllUser));
userRoutes.put(
  "/action-active/:id",
  verifyToken,
  catchAsync(UserController.actionIsActiveUser)
);
export default userRoutes;

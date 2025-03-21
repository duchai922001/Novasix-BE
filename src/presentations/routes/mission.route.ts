import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { MissionController } from "../controllers/mission.controller";

const missionRoutes = Router();

missionRoutes.post(
  "/reward",
  verifyToken,
  catchAsync(MissionController.rewardToken)
);

export default missionRoutes;

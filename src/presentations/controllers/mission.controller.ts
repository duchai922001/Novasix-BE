import { Request, Response } from "express";
import { MissionService } from "../../services/mission.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const MissionController = {
  rewardToken: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { reward, type } = req.body;
    const data = await MissionService.rewardToken(user.userId, type, reward);
    return res.json(
      successResponse(HttpStatus.OK, "Nhận thưởng thành công", data)
    );
  },
};

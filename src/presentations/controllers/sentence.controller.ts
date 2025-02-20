import { Request, Response } from "express";
import { SentenceService } from "../../services/sentence.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const SentenceController = {
  createScript: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const newScript = await SentenceService.createScript(payload);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", newScript));
  },
  getScriptByDate: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Ngày không hợp lệ" });
    }
    const script = await SentenceService.getScriptByDate(user.userId, date);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", script)
    );
  },
};

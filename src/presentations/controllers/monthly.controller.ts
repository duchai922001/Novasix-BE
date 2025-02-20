import { Request, Response } from "express";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { MonthEventService } from "../../services/month.service";
import { successResponse } from "../../utils/response-success.util";

export const MonthlyEventController = {
  createEvent: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const payload = {
      ...req.body,
      userId: user.userId,
    };
    const newEvent = await MonthEventService.createEvent(payload);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(HttpStatus.CREATED, "Tạo sự kiện thành công", newEvent)
      );
  },
  getEventMonthly: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { currentYear, currentMonth } = req.query;
    if (
      !currentYear ||
      !currentMonth ||
      typeof currentYear !== "string" ||
      typeof currentMonth !== "string"
    ) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, message: "Năm tháng không hợp lệ" });
    }
    const eventsMonthly = await MonthEventService.getEventMonthly(
      user.userId,
      currentYear,
      currentMonth
    );
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", eventsMonthly)
    );
  },
};

import { Request, Response } from "express";
import { OrderService } from "../../services/order.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const OrderController = {
  createOrder: async (req: Request, res: Response) => {
    const newOrder = await OrderService.createOrder(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", newOrder));
  },
  getOrdersByUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await OrderService.getOrderByUser(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  getAllOrder: async (req: Request, res: Response) => {
    const username = req.query.username as string;
    const transId = req.query.transId as string;
    const status = req.query.status as string;
    const data = await OrderService.getAllOrder(transId, username, status);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

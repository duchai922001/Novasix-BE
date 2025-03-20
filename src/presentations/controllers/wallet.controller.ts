import { Request, Response } from "express";
import { WalletService } from "../../services/wallet.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

export const WalletController = {
  getWalletOfUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await WalletService.getWalletBalance(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
  depositWallet: async (req: Request, res: Response) => {
    const { userId, amount } = req.body;
    if (amount <= 0) {
      throw new BadRequestException("Số tiền không hợp lệ");
    }
    const wallet = await WalletService.depositToWallet(userId, amount);
    return res.json(
      successResponse(HttpStatus.OK, "Nạp tiền thành công", wallet)
    );
  },
};

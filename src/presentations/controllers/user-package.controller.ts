import { Request, Response } from "express";
import { UserPackageService } from "../../services/user-package.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const UserPackageController = {
  buyPackage: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const { typePackage } = req.body;
    const formData = {
      userId: user.userId,
      typePackage,
    };
    const data = await UserPackageService.buyPackage(formData);
    return res.json(successResponse(HttpStatus.OK, "Mua gói thành công", data));
  },
  getPackagesUser: async (req: Request, res: Response) => {
    const user = res.locals.user;
    const data = await UserPackageService.getPackagesUser(user.userId);
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

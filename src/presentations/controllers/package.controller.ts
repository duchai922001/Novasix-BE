import { Request, Response } from "express";
import { PackageService } from "../../services/package.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const PackageController = {
  createPackage: async (req: Request, res: Response) => {
    const data = await PackageService.createPackage(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", data));
  },
  getPackages: async (req: Request, res: Response) => {
    const data = await PackageService.getPackages();
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", data)
    );
  },
};

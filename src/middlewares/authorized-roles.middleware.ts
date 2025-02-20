import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../domain/enums/http-status.enum";

export const authorizeRoles =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const userRole = req.user?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        res.status(HttpStatus.FORBIDDEN).json({
          message: `Truy cập bị từ chối. Bạn cần một trong những vai trò sau: ${allowedRoles.join(
            ", "
          )}`,
          attemptedRole: userRole || "undefined",
        });
        return;
      }

      next();
    } catch (err) {
      next(err);
    }
  };

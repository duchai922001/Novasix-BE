import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";

import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { WalletController } from "../controllers/wallet.controller";

const walletRoutes = Router();

walletRoutes.get(
  "/user",
  verifyToken,
  catchAsync(WalletController.getWalletOfUser)
);
walletRoutes.post(
  "/deposite",
  verifyToken,
  catchAsync(WalletController.depositWallet)
);

export default walletRoutes;

import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { PackageController } from "../controllers/package.controller";

const packageRoutes = Router();

packageRoutes.post("/create", catchAsync(PackageController.createPackage));
packageRoutes.get("/", catchAsync(PackageController.getPackages));

export default packageRoutes;

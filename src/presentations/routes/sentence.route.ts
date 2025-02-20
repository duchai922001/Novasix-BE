import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { WeeklyTaskController } from "../controllers/weekly.controller";
import { WeeklyTaskDTO } from "../dtos/weekly/weekly-task.dto";
import { verifyToken } from "../../middlewares/verify-token.middlewares";
import { SentenceDTO } from "../dtos/sentence/sentence.dto";
import { SentenceController } from "../controllers/sentence.controller";

const sentenceRoutes = Router();

sentenceRoutes.post(
  "/create",
  verifyToken,
  transformAndValidate(SentenceDTO),
  catchAsync(SentenceController.createScript)
);

sentenceRoutes.get(
  "/",
  verifyToken,
  catchAsync(SentenceController.getScriptByDate)
);

export default sentenceRoutes;

import { Router } from "express";
import { transformAndValidate } from "../../middlewares/transformAndValidate.middleware";
import { catchAsync } from "../../utils/catchAsync.util";
import { QuoteDTO } from "../dtos/quote/quote.dto";
import { QuoteController } from "../controllers/quote.controller";

const quoteRoutes = Router();

quoteRoutes.post(
  "/create",
  transformAndValidate(QuoteDTO),
  catchAsync(QuoteController.createQuote)
);

quoteRoutes.get("/", catchAsync(QuoteController.getRandomQuote));

export default quoteRoutes;

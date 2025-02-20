import { Request, Response } from "express";
import { QuoteService } from "../../services/quote.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const QuoteController = {
  createQuote: async (req: Request, res: Response) => {
    const newQuote = await QuoteService.createQuote(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(successResponse(HttpStatus.CREATED, "Tạo thành công", newQuote));
  },
  getRandomQuote: async (req: Request, res: Response) => {
    const quote = await QuoteService.getRandomQuote();
    return res.json(
      successResponse(HttpStatus.OK, "Lấy dữ liệu thành công", quote)
    );
  },
};

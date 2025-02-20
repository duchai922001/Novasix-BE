import { IQuote } from "../../infrastructure/model/quote.model";
import { ICreateQuote } from "../../types/quote.interface";

export interface IQuoteRepository {
  createQuote(formData: ICreateQuote): Promise<IQuote>;
  getRandomQuote(): Promise<IQuote | null>;
}

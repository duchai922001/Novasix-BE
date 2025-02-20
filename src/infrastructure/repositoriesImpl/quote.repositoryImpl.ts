import { IQuoteRepository } from "../../domain/repositories/quote.repository";
import { ICreateQuote } from "../../types/quote.interface";
import Quote, { IQuote } from "../model/quote.model";

export class QuoteRepoImpl implements IQuoteRepository {
  async createQuote(formData: ICreateQuote): Promise<IQuote> {
    return await Quote.create(formData);
  }
  async getRandomQuote(): Promise<IQuote | null> {
    const count = await Quote.countDocuments();
    if (count === 0) return null;
    const randomIndex = Math.floor(Math.random() * count);
    return Quote.findOne().skip(randomIndex).exec();
  }
}

import { QuoteRepoImpl } from "../infrastructure/repositoriesImpl/quote.repositoryImpl";
import { QuoteDTO } from "../presentations/dtos/quote/quote.dto";
import { ICreateQuote } from "../types/quote.interface";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const quoteRepo = new QuoteRepoImpl();
export const QuoteService = {
  createQuote: async (formData: ICreateQuote) => {
    const dataQuoteDto = await createAndValidateDto(QuoteDTO, formData);
    return await quoteRepo.createQuote(dataQuoteDto);
  },
  getRandomQuote: async () => {
    return await quoteRepo.getRandomQuote();
  },
};

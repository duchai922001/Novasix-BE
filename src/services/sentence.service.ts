import { ISentence } from "../infrastructure/model/sentence.model";
import { SentenceRepoImpl } from "../infrastructure/repositoriesImpl/sentence.repositoryImpl";
import { SentenceDTO } from "../presentations/dtos/sentence/sentence.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const sentenceRepo = new SentenceRepoImpl();
export const SentenceService = {
  createScript: async (formData: ISentence) => {
    const dataSentenceDto = await createAndValidateDto(SentenceDTO, formData);
    return await sentenceRepo.createScript(dataSentenceDto);
  },
  getScriptByDate: async (userId: string, date: string) => {
    return await sentenceRepo.getSentenceByDate(userId, date);
  },
};

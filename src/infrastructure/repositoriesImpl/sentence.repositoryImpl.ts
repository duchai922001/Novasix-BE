import dayjs from "dayjs";
import { ISentenceRepository } from "../../domain/repositories/sentence.repository";
import Sentence, { ISentence } from "../model/sentence.model";

export class SentenceRepoImpl implements ISentenceRepository {
  async getSentenceByDate(
    userId: string,
    date: string
  ): Promise<ISentence | null> {
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    return Sentence.findOne({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).exec();
  }
  async createScript(formData: ISentence): Promise<ISentence> {
    return await Sentence.create(formData);
  }
}

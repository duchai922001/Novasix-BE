import { ISentence } from "../../infrastructure/model/sentence.model";
import { IUser } from "../../infrastructure/model/user.model";

export interface ISentenceRepository {
  createScript(formData: ISentence): Promise<ISentence>;
  getSentenceByDate(userId: string, date: string): Promise<ISentence | null>;
}

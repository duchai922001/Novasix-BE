import { IAchivementRepository } from "../../domain/repositories/achivement.repository";
import Achievement, { IAchievement } from "../model/achievement.model";

export class AchivementRepositoryImpl implements IAchivementRepository {
  async getAllAchivement(): Promise<IAchievement[]> {
    return await Achievement.find();
  }
  async createAchivement(data: IAchievement): Promise<IAchievement> {
    return await Achievement.create(data);
  }
}

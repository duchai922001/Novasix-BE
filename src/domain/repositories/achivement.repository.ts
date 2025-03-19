import { IAchievement } from "../../infrastructure/model/achievement.model";

export interface IAchivementRepository {
  createAchivement(data: IAchievement): Promise<IAchievement>;
  getAllAchivement(): Promise<IAchievement[]>;
}

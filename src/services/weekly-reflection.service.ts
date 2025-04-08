import { IWeeklyReflection } from "../infrastructure/model/weekly-reflection.model";
import { WeeklyReflectionRepositoryImpl } from "../infrastructure/repositoriesImpl/weekly-reflection.repositoryImpl";

const weeklyReflectionRepo = new WeeklyReflectionRepositoryImpl();
export const WeeklyReflectionService = {
  create: async (data: IWeeklyReflection) => {
    return await weeklyReflectionRepo.create(data);
  },
  getWeekReflection: async (userId: string, dateWeek: string) => {
    return await weeklyReflectionRepo.getWeekReflection(userId, dateWeek);
  },
};

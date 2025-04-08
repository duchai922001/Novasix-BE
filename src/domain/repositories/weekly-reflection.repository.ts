import { IWeeklyReflection } from "../../infrastructure/model/weekly-reflection.model";

export interface IWeeklyReflectionRepository {
  create(data: IWeeklyReflection): Promise<IWeeklyReflection>;
  getWeekReflection(
    userId: string,
    dateWeek: string
  ): Promise<IWeeklyReflection | null>;
}

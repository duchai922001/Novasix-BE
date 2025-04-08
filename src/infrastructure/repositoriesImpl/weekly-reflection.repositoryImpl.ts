import dayjs from "dayjs";
import { IWeeklyReflectionRepository } from "../../domain/repositories/weekly-reflection.repository";
import WeeklyReflection, {
  IWeeklyReflection,
} from "../model/weekly-reflection.model";

export class WeeklyReflectionRepositoryImpl
  implements IWeeklyReflectionRepository
{
  async getWeekReflection(
    userId: string,
    dateWeek: string
  ): Promise<IWeeklyReflection | null> {
    const weekStart = dayjs(dateWeek).startOf("week").toDate();
    const weekEnd = dayjs(dateWeek).endOf("week").toDate();
    return await WeeklyReflection.findOne({
      userId,
      createdAt: { $gte: weekStart, $lte: weekEnd },
    }).exec();
  }
  async create(data: IWeeklyReflection): Promise<IWeeklyReflection> {
    return await WeeklyReflection.create(data);
  }
}

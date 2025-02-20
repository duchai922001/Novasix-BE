import { IWeeklyRepository } from "../../domain/repositories/weekly.repository";
import WeeklyTask, { IWeeklyTask } from "../model/weekly-task.model";
import dayjs from "dayjs";
export class WeeklyRepositoryImpl implements IWeeklyRepository {
  async findDailyTaskById(weekTaskId: string): Promise<IWeeklyTask | null> {
    return await WeeklyTask.findOne({ _id: weekTaskId });
  }
  async updateDailyTask(
    weekTaskId: string,
    task: IWeeklyTask
  ): Promise<IWeeklyTask | null> {
    return await WeeklyTask.findByIdAndUpdate(weekTaskId, task, {
      new: true,
      upsert: false,
    });
  }
  async createTaskWeek(task: IWeeklyTask): Promise<IWeeklyTask> {
    return await WeeklyTask.create(task);
  }
  async getTaskWeek(userId: string, dateWeek: string): Promise<IWeeklyTask[]> {
    const weekStart = dayjs(dateWeek).startOf("week").toDate();
    const weekEnd = dayjs(dateWeek).endOf("week").toDate();
    return await WeeklyTask.find({
      userId,
      createdAt: { $gte: weekStart, $lte: weekEnd },
    }).exec();
  }
}

import { IDailyRepository } from "../../domain/repositories/daily.repository";
import DailyTask, { IDailyTask } from "../model/daily-task.model";

export class DailyRepositoryImpl implements IDailyRepository {
  async deleteDailyTask(dailyTaskId: string): Promise<boolean> {
    return await DailyTask.findByIdAndDelete(dailyTaskId)
      .then(() => true)
      .catch(() => false);
  }
  async updateDailyTask(
    dailyTaskId: string,
    task: IDailyTask
  ): Promise<IDailyTask | null> {
    return await DailyTask.findByIdAndUpdate(dailyTaskId, task, {
      new: true,
      upsert: false,
    });
  }
  async findDailyTaskById(dailyTaskId: string): Promise<IDailyTask | null> {
    return await DailyTask.findOne({ _id: dailyTaskId });
  }
  async createTaskDaily(task: IDailyTask): Promise<IDailyTask> {
    return await DailyTask.create(task);
  }
  async getProcessTaskDaily(
    userId: string,
    date: string | Date
  ): Promise<IDailyTask[]> {
    const targetDate = new Date(date);

    if (isNaN(targetDate.getTime())) {
      throw new Error("Ngày không hợp lệ");
    }

    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "done" },
    });
  }

  async getCompletedTaskDaily(
    userId: string,
    date: string | Date
  ): Promise<IDailyTask[]> {
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      throw new Error("Ngày không hợp lệ");
    }

    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: "done",
    });
  }
}

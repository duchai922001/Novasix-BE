import { IDailyRepository } from "../../domain/repositories/daily.repository";
import DailyTask, { IDailyTask } from "../model/daily-task.model";

export class DailyRepositoryImpl implements IDailyRepository {
  constructor() {}

  async findDailyTaskByUser(userId: string): Promise<IDailyTask[]> {
    return await DailyTask.find({ userId });
  }

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
    date: Date | string
  ): Promise<IDailyTask[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: { $ne: "done" },
    }).lean();
  }

  async getCompletedTaskDaily(
    userId: string,
    date: Date | string
  ): Promise<IDailyTask[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
      status: "done",
    }).lean();
  }

  async getProcessTaskWeekly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfWeek = new Date(startDate);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(endDate);
    endOfWeek.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      status: { $ne: "done" },
    }).lean();
  }

  async getCompletedTaskWeekly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfWeek = new Date(startDate);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(endDate);
    endOfWeek.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      status: "done",
    }).lean();
  }

  async getProcessTaskMonthly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfMonth = new Date(startDate);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(endDate);
    endOfMonth.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: "done" },
    }).lean();
  }

  async getCompletedTaskMonthly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfMonth = new Date(startDate);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(endDate);
    endOfMonth.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      status: "done",
    }).lean();
  }

  async getProcessTaskYearly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfYear = new Date(startDate);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date(endDate);
    endOfYear.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfYear, $lte: endOfYear },
      status: { $ne: "done" },
    }).lean();
  }

  async getCompletedTaskYearly(
    userId: string,
    startDate: Date | string,
    endDate: Date | string
  ): Promise<IDailyTask[]> {
    const startOfYear = new Date(startDate);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date(endDate);
    endOfYear.setHours(23, 59, 59, 999);

    return await DailyTask.find({
      userId,
      createdAt: { $gte: startOfYear, $lte: endOfYear },
      status: "done",
    }).lean();
  }
}

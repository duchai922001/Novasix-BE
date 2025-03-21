import { ITaskUsageRepository } from "../../domain/repositories/task-usage.repository";
import { ITaskUsage, TaskUsage } from "../model/task-usage.model";

export class TaskUsageRepoImpl implements ITaskUsageRepository {
  async logTaskUsage(formData: any): Promise<ITaskUsage> {
    const { userId, startTime, endTime } = formData;
    const duration = Math.round(
      (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000
    );

    const hourSlot = new Date(startTime).getHours();
    return await TaskUsage.create({
      userId,
      startTime,
      endTime,
      duration,
      hourSlot,
    });
  }
}

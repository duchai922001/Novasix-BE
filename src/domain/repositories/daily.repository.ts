import { IDailyTask } from "../../infrastructure/model/daily-task.model";

export interface IDailyRepository {
  createTaskDaily(task: IDailyTask): Promise<IDailyTask>;
  findDailyTaskById(dailyTaskId: string): Promise<IDailyTask | null>;
  updateDailyTask(
    dailyTaskId: string,
    task: IDailyTask
  ): Promise<IDailyTask | null>;
  deleteDailyTask(dailyTaskId: string): Promise<boolean>;
  getProcessTaskDaily(date: string | Date): Promise<IDailyTask[]>;
  getCompletedTaskDaily(date: string | Date): Promise<IDailyTask[]>;
}

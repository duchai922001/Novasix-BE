import { IWeeklyTask } from "../../infrastructure/model/weekly-task.model";

export interface IWeeklyRepository {
  createTaskWeek(task: IWeeklyTask): Promise<IWeeklyTask>;
  getTaskWeek(userId: string, dateWeek: string): Promise<IWeeklyTask[]>;
  findDailyTaskById(weekTaskId: string): Promise<IWeeklyTask | null>;
  updateDailyTask(
    weekTaskId: string,
    task: IWeeklyTask
  ): Promise<IWeeklyTask | null>;
}

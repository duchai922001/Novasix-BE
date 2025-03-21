import { IDailyTask } from "../../infrastructure/model/daily-task.model";

export interface IDailyRepository {
  createTaskDaily(task: IDailyTask): Promise<IDailyTask>;
  findDailyTaskById(dailyTaskId: string): Promise<IDailyTask | null>;
  updateDailyTask(
    dailyTaskId: string,
    task: IDailyTask
  ): Promise<IDailyTask | null>;
  deleteDailyTask(dailyTaskId: string): Promise<boolean>;
  getProcessTaskDaily(
    userId: string,
    date: string | Date
  ): Promise<IDailyTask[]>;
  getCompletedTaskDaily(
    userId: string,
    date: string | Date
  ): Promise<IDailyTask[]>;

  // Mới thêm: lấy task theo tuần, tháng, năm
  getProcessTaskWeekly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;
  getCompletedTaskWeekly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;

  getProcessTaskMonthly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;
  getCompletedTaskMonthly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;

  getProcessTaskYearly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;
  getCompletedTaskYearly(
    userId: string,
    startDate: string | Date,
    endDate: string | Date
  ): Promise<IDailyTask[]>;

  findDailyTaskByUser(userId: string): Promise<IDailyTask[]>;
}

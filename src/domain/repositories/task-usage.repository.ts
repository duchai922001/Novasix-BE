import { ITaskUsage } from "../../infrastructure/model/task-usage.model";

export interface ITaskUsageRepository {
  logTaskUsage(formData: any): Promise<ITaskUsage>;
}

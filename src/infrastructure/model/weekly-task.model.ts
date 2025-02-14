import { Document } from "mongoose";
import { TypeTask } from "../../domain/enums/type-task.enum";

export interface IWeeklyTask extends Document {
  name: string;
  status: "check" | "uncheck";
  weeklyTime: string;
  type: TypeTask;
}

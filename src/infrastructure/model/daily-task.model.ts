import { Document } from "mongoose";
import { TypeTask } from "../../domain/enums/type-task.enum";
import { StatusTask } from "../../domain/enums/status-task.enum";

export interface IAchievement extends Document {
  title: string;
  description: string;
  dateTime: string;
  attachedFile: string;
  numberOfPomodoros: string;
  type: TypeTask;
  status: StatusTask;
}

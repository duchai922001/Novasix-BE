import mongoose, { Document, Schema } from "mongoose";
import { TypeTask } from "../../domain/enums/type-task.enum";
import { StatusTask } from "../../domain/enums/status-task.enum";

export interface IDailyTask extends Document {
  title: string;
  description: string;
  attachedFile: string;
  numberOfPomodoros: number;
  type: TypeTask;
  status: StatusTask;
}

const DailyTaskSchema: Schema = new Schema<IDailyTask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    attachedFile: {
      type: String,
    },
    numberOfPomodoros: {
      type: Number,
    },
    type: {
      type: String,
      enum: TypeTask,
      required: true,
    },
    status: {
      type: String,
      enum: StatusTask,
      default: StatusTask.NOT_YET,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const DailyTask = mongoose.model<IDailyTask>("DailyTask", DailyTaskSchema);
export default DailyTask;

import mongoose, { Document, Schema } from "mongoose";
import { TypeTask } from "../../domain/enums/type-task.enum";

export interface IWeeklyTask extends Document {
  userId: string;
  name: string;
  isChecked: boolean;
  type: TypeTask;
}

const WeeklyTaskSchema: Schema = new Schema<IWeeklyTask>(
  {
    userId: { type: String, required: true },
    name: {
      type: String,
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      enum: TypeTask,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WeeklyTask = mongoose.model<IWeeklyTask>("WeeklyTask", WeeklyTaskSchema);
export default WeeklyTask;

import mongoose, { Schema, Document } from "mongoose";

export interface ITaskUsage extends Document {
  userId: string;
  startTime: Date;
  endTime: Date;
  duration: number; // Tổng thời gian sử dụng (phút)
  hourSlot: number; // Khung giờ sử dụng (VD: 9 => 9-10h)
}

const TaskUsageSchema = new Schema<ITaskUsage>(
  {
    userId: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    hourSlot: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TaskUsage = mongoose.model<ITaskUsage>(
  "TaskUsage",
  TaskUsageSchema
);

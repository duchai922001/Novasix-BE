import mongoose, { Document, Schema } from "mongoose";

export interface IWeeklyReflection extends Document {
  userId: string;
  checkin: string;
  success: string;
  lesson: string;
  future: string;
  noteMore: string;
  isSured: boolean;
}

const WeeklyReflectionSchema: Schema = new Schema<IWeeklyReflection>(
  {
    userId: { type: String, required: true },
    checkin: { type: String, required: true },
    success: {
      type: String,
      required: true,
    },
    lesson: {
      type: String,
      required: true,
    },

    future: {
      type: String,
      required: true,
    },
    noteMore: {
      type: String,
      required: true,
    },
    isSured: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const WeeklyReflection = mongoose.model<IWeeklyReflection>(
  "WeeklyReflection",
  WeeklyReflectionSchema
);
export default WeeklyReflection;

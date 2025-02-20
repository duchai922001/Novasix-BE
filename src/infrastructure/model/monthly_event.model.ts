import mongoose, { Document, Schema } from "mongoose";

export interface IMonthlyEvent extends Document {
  note: string;
  dateTime: string;
  userId: string;
}

const MonthlyEventSchema: Schema = new Schema<IMonthlyEvent>(
  {
    note: {
      type: String,
      required: true,
    },
    dateTime: {
      type: String,
      required: true,
    },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MonthlyEvent = mongoose.model<IMonthlyEvent>(
  "MonthlyEvent",
  MonthlyEventSchema
);
export default MonthlyEvent;

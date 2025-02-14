import { Document } from "mongoose";

export interface IMonthlyEvent extends Document {
  note: string;
  dateTime: string;
}

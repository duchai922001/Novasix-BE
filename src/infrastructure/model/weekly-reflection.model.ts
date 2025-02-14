import { Document } from "mongoose";

export interface IWeeklyReflection extends Document {
  checkin: string;
  success: string;
  lesson: string;
  future: string;
  noteMore: string;
  isSured: boolean;
}

import { Document } from "mongoose";

export interface ISuggestion extends Document {
  image: string;
  title: string;
  description: string;
  conditionDaily: number;
  conditionWeekly: number;
  conditionMonthly: number;
}

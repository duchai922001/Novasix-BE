import { Document } from "mongoose";

export interface IPomodoro extends Document {
  countdownTime: number;
  isHide: boolean;
}

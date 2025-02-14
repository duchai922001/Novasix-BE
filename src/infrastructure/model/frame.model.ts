import { Document } from "mongoose";

export interface IFrame extends Document {
  name: string;
  pointCondition: number;
  isHide: boolean;
  type: "event" | "point";
}

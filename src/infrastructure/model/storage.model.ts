import { Document } from "mongoose";

export interface IStorage extends Document {
  limitTheme: number;
  limitFrame: number;
  pointExpand: number;
  themeId: string[];
  frameId: string[];
}

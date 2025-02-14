import { Document } from "mongoose";

export interface ITheme extends Document {
  name: string;
  description: string;
  isHide: boolean;
  //note theem field giao dieenj
}

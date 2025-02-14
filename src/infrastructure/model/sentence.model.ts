import { Document } from "mongoose";

export interface ISentence extends Document {
  script: string;
}

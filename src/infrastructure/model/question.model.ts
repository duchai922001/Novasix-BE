import { Document } from "mongoose";

export interface IQuestion extends Document {
  image: string;
  question: string;
  answer: string;
  link: string;
}

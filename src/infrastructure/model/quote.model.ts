import { Document } from "mongoose";

export interface IQuote extends Document {
  image: string;
  description: string;
  author: string;
  isHide: boolean;
  isFavorite: boolean;
}

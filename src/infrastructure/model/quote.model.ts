import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  image: string;
  description: string;
  author: string;
  isHide: boolean;
}

const QuoteSchema: Schema = new Schema<IQuote>(
  {
    image: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    isHide: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Quote = mongoose.model<IQuote>("Quote", QuoteSchema);
export default Quote;

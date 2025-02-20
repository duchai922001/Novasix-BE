import mongoose, { Document, Schema } from "mongoose";

export interface ISentence extends Document {
  script: string;
  userId: string;
}

const SentenceSchema: Schema = new Schema<ISentence>(
  {
    userId: { type: String, required: true },
    script: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Sentence = mongoose.model<ISentence>("Sentence", SentenceSchema);
export default Sentence;

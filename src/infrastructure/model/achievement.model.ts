import mongoose, { Document, Schema } from "mongoose";

export interface IAchievement extends Document {
  name: string;
  image: string;
  description: string;
  typeEven: "normal" | "special";
  unlockCondition: number;
  dateAchieved: string;
  experiencePoints: number;
  giftPoint: number;
  status: "lock" | "unlock";
}

const AchievementSchema: Schema = new Schema<IAchievement>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Achievement = mongoose.model<IAchievement>(
  "Achievement",
  AchievementSchema
);
export default Achievement;

import mongoose, { Document, Schema } from "mongoose";

export interface IAchievement extends Document {
  name: string;
  description: string;
  image: string;
  type: "daily" | "weekly" | "monthly" | "onboarding"; // Loại nhiệm vụ
  unlockCondition: number; // Điều kiện để mở khóa (ví dụ: 5 task, 3 pomodoro, etc.)
  giftPoint: number; // Điểm thưởng khi đạt được
  status: "lock" | "unlock"; // Trạng thái của achievement
}

const AchievementSchema: Schema = new Schema<IAchievement>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "onboarding"],
      required: true,
    },
    unlockCondition: { type: Number, required: true },
    giftPoint: { type: Number, required: true },
    status: { type: String, enum: ["lock", "unlock"], default: "lock" },
  },
  { timestamps: true, versionKey: false }
);

const Achievement = mongoose.model<IAchievement>(
  "Achievement",
  AchievementSchema
);
export default Achievement;

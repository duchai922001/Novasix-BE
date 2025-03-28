import mongoose, { Document, Schema } from "mongoose";

export interface IPomodoroSetting extends Document {
  pomodoroTimer: number;
  breakTimer: number;
}

const PomodoroSettingSchema: Schema = new Schema<IPomodoroSetting>(
  {
    pomodoroTimer: { type: Number, default: 25 },
    breakTimer: { type: Number, default: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PomodoroSetting = mongoose.model<IPomodoroSetting>(
  "PomodoroSettingSchema",
  PomodoroSettingSchema
);
export default PomodoroSetting;

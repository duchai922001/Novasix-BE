import mongoose, { Document, Schema } from "mongoose";

export interface IPomodoro extends Document {
  userId?: string;
  pomodoroTimer: number;
  breakTimer: number;
}

const PomodoroSchema: Schema = new Schema<IPomodoro>(
  {
    userId: { type: String },
    pomodoroTimer: { type: Number, default: 25 },
    breakTimer: { type: Number, default: 5 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Pomodoro = mongoose.model<IPomodoro>("Pomodoro", PomodoroSchema);
export default Pomodoro;

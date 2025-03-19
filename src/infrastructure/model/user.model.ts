import mongoose, { Document, Schema } from "mongoose";
import { Role } from "../../domain/enums/role.enum";

export interface IUser extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  point: number;
  isActive: boolean;
  role: Role;
  personalInfoCompleted: boolean; // Đã cập nhật thông tin cá nhân chưa?
  tasksCompleted: number; // Số task hoàn thành
  dailyPomodoroUsed: number; // Tổng số pomodoro đã dùng trong ngay
  weeklyPomodoroUsed: number; // Tổng số pomodoro đã dùng trong tuan
  monthlyPomodoroUsed: number; // Tổng số pomodoro đã dùng trong thang
  gratitudeEntries: number; // Số lần viết nhật ký biết ơn
  weeklyReflections: number; // Số lần viết weekly reflection
  achievements: mongoose.Types.ObjectId[]; // Danh sách thành tích đạt được
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    point: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },
    personalInfoCompleted: { type: Boolean, default: false },
    tasksCompleted: { type: Number, default: 0 },
    dailyPomodoroUsed: { type: Number, default: 0 },
    weeklyPomodoroUsed: { type: Number, default: 0 },
    monthlyPomodoroUsed: { type: Number, default: 0 },
    gratitudeEntries: { type: Number, default: 0 },
    weeklyReflections: { type: Number, default: 0 },
    achievements: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Achievement" },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

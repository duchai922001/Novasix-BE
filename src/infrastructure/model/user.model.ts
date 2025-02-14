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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

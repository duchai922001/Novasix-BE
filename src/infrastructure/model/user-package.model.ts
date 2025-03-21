import mongoose, { Document, Schema } from "mongoose";

export interface IUserPackage extends Document {
  userId: string;
  packageId: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

const UserPackageSchema: Schema = new Schema<IUserPackage>(
  {
    userId: { type: String, ref: "User", required: true },
    packageId: { type: String, ref: "Package", required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "expired"], default: "active" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserPackage = mongoose.model<IUserPackage>(
  "UserPackage",
  UserPackageSchema
);
export default UserPackage;

import mongoose, { Document, Schema } from "mongoose";

interface ITypePackage extends Document {
  _id: mongoose.Types.ObjectId;
  typePackage: string;
}
export interface IUserPackage extends Document {
  userId: string;
  packageId: string | ITypePackage;
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

import mongoose, { Document, Schema } from "mongoose";
import { PackageType } from "../../domain/enums/package-type.enum";

export interface IPackage extends Document {
  name: string;
  price: number;
  timeExp: number;
  description: string;
  isShow: boolean;
  discountPercent: number;
  typePackage: string;
}

const PackageSchema: Schema = new Schema<IPackage>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    timeExp: {
      type: Number,
      required: true,
      default: 1,
    },
    description: {
      type: String,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    discountPercent: {
      type: Number,
      default: 0,
    },
    typePackage: {
      type: String,
      enum: PackageType,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Package = mongoose.model<IPackage>("Package", PackageSchema);
export default Package;

import mongoose, { Document, Schema } from "mongoose";

export interface IPackage extends Document {
  name: string;
  price: number;
  timeExp: number; //tinh theo ngay
  mainDescription: string;
  subDescription: string;
  giftPoint: number;
  type: string;
  isShow: boolean; // default true
  discount: number;
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
    },
    mainDescription: {
      type: String,
      required: true,
    },
    subDescription: {
      type: String,
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

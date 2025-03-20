import mongoose, { Document, Schema } from "mongoose";
export interface IOrder extends Document {
  userId: string;
  amount: number;
  status: "pending" | "success" | "failed";
  transId: string;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;

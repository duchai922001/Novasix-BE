import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  message: string;
  readBy: string[];
}

const NotificationSchema: Schema = new Schema(
  {
    message: { type: String, required: true },
    readBy: [{ type: String, default: [] }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Notification = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
export default Notification;

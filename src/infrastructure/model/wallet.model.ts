import mongoose, { Document, Schema } from "mongoose";

export interface IWallet extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  balance: number;
}

const WalletSchema = new Schema<IWallet>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema);
export default Wallet;

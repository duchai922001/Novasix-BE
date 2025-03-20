import { IWalletRepository } from "../../domain/repositories/wallet.repository";
import Wallet, { IWallet } from "../model/wallet.model";

export class WalletRepositoryImpl implements IWalletRepository {
  async getWalletByUser(userId: string): Promise<IWallet | null> {
    return await Wallet.findOne({ userId });
  }
  async depositeWallet(userId: string, amount: number): Promise<IWallet> {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balance: amount });
    } else {
      wallet.balance += amount;
    }
    return await wallet.save();
  }
}

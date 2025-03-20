import { IWallet } from "../../infrastructure/model/wallet.model";

export interface IWalletRepository {
  getWalletByUser(userId: string): Promise<IWallet | null>;
  depositeWallet(userId: string, amount: number): Promise<IWallet>;
}

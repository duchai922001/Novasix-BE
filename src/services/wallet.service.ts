import { WalletRepositoryImpl } from "../infrastructure/repositoriesImpl/wallet.repositoryImpl";

const walletRepository = new WalletRepositoryImpl();
export const WalletService = {
  async getWalletBalance(userId: string) {
    const wallet = await walletRepository.getWalletByUser(userId);
    return wallet ? wallet.balance : 0;
  },

  async depositToWallet(userId: string, amount: number) {
    return await walletRepository.depositeWallet(userId, amount);
  },
};

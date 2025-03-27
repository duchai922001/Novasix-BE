import { IOrder } from "../infrastructure/model/order.model";
import { OrderRepoImpl } from "../infrastructure/repositoriesImpl/order.repositoryImpl";
import { WalletRepositoryImpl } from "../infrastructure/repositoriesImpl/wallet.repositoryImpl";
const orderRepo = new OrderRepoImpl();
const walletRepo = new WalletRepositoryImpl();
export const OrderService = {
  createOrder: async (formData: any) => {
    return await orderRepo.createOrder(formData);
  },
  getOrderByUser: async (userId: string) => {
    return await orderRepo.getOrderByUser(userId);
  },
  updateOrderStatus: async (transId: string, status: string) => {
    const data = await orderRepo.updateOrderStatus(transId, status);
    if (data && status === "success") {
      await walletRepo.depositeWallet(data?.userId, data?.amount / 100);
    }
  },
  getAllOrder: async (transId: string, username: string, status: string) => {
    const data = await orderRepo.getAllOrder(transId, username, status);
    return data;
  },
};

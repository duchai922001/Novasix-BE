import { IOrder } from "../infrastructure/model/order.model";
import { OrderRepoImpl } from "../infrastructure/repositoriesImpl/order.repositoryImpl";
const orderRepo = new OrderRepoImpl();
export const OrderService = {
  createOrder: async (formData: any) => {
    return await orderRepo.createOrder(formData);
  },
  getOrderByUser: async (userId: string) => {
    return await orderRepo.getOrderByUser(userId);
  },
  updateOrderStatus: async (transId: string, status: string) => {
    return await orderRepo.updateOrderStatus(transId, status);
  },
};

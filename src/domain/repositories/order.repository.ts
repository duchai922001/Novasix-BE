import { IOrder } from "../../infrastructure/model/order.model";

export interface IOrderRepository {
  createOrder(formData: IOrder): Promise<IOrder>;
  getOrderByUser(userId: string): Promise<IOrder[]>;
  updateOrderStatus(transId: string, status: string): Promise<IOrder | null>;
  getAllOrder(
    transId: string,
    username: string,
    status: string
  ): Promise<IOrder[]>;
}

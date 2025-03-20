import { IOrderRepository } from "../../domain/repositories/order.repository";

import Order, { IOrder } from "../model/order.model";

export class OrderRepoImpl implements IOrderRepository {
  async createOrder(formData: any): Promise<IOrder> {
    return await Order.create(formData);
  }
  async getOrderByUser(userId: string): Promise<IOrder[]> {
    return await Order.find({ userId });
  }
  async updateOrderStatus(
    transId: string,
    status: string
  ): Promise<IOrder | null> {
    return await Order.findOneAndUpdate({ transId }, { status }, { new: true });
  }
}

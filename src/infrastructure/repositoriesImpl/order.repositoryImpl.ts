import { IOrderRepository } from "../../domain/repositories/order.repository";
import { Types } from "mongoose";
import Order, { IOrder } from "../model/order.model";
import User from "../model/user.model";

export class OrderRepoImpl implements IOrderRepository {
  async getAllOrder(
    transId?: string,
    username?: string,
    status?: string
  ): Promise<IOrder[]> {
    const filter: any = {};

    if (status) {
      filter.status = status;
    }
    if (!transId && !username) {
      return await Order.find(filter).populate("userId", "username");
    }

    let orders: IOrder[] = [];

    // Nếu có transId, tìm trước theo transId
    if (transId) {
      orders = await Order.find({
        transId: { $regex: transId, $options: "i" },
        ...filter,
      }).populate("userId", "username");

      if (orders.length > 0) {
        return orders; // Nếu có dữ liệu, trả về ngay
      }
    }

    // Nếu transId không có kết quả, tìm theo username
    if (username) {
      const users = await User.find(
        { name: { $regex: username, $options: "i" } },
        "_id"
      );

      const userIds = users.map((user) => user._id);

      if (userIds.length > 0) {
        filter.userId = { $in: userIds };
        orders = await Order.find(filter).populate("userId", "username");
      }
    }

    return orders; // Nếu cả transId và username đều không có dữ liệu, trả về []
  }

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

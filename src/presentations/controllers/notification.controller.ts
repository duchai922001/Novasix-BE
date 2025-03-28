import { Request, Response } from "express";
import Notification from "../../infrastructure/model/notification.model";
import { io, onlineUsers } from "../..";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

// 📌 Admin gửi thông báo đến tất cả user
export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message) {
      throw new BadRequestException("message bắt buộc nhập");
    }

    // Lưu vào MongoDB (không chỉ định userId, nghĩa là gửi cho tất cả user)
    const notification = new Notification({ message, readBy: [] });
    await notification.save();

    // Gửi thông báo real-time đến tất cả user online
    io.emit("newNotification", { message });

    return res.json(successResponse(HttpStatus.OK, "Thông báo đã được gửi"));
  } catch (error) {
    return res.status(500).json({ error: "Lỗi gửi thông báo" });
  }
};

// 📌 User lấy danh sách thông báo
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user; // Lấy user từ middleware
    const notifications = await Notification.find().sort({ createdAt: -1 });

    // Đếm số thông báo chưa đọc
    const unreadCount = notifications.filter(
      (notif) => !notif.readBy.includes(user.userId)
    ).length;

    return res.json(
      successResponse(HttpStatus.OK, "Danh sách thông báo", {
        notifications,
        unreadCount,
      })
    );
  } catch (error) {
    return res.status(500).json({ error: "Lỗi lấy thông báo" });
  }
};

// 📌 User đánh dấu tất cả thông báo là đã đọc
export const markNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user; // Lấy user từ middleware

    // Cập nhật chỉ những thông báo mà user chưa đọc
    await Notification.updateMany(
      { readBy: { $ne: user.userId } }, // Nếu user chưa đọc
      { $push: { readBy: user.userId } } // Thêm user vào danh sách đã đọc
    );

    return res.json(successResponse(HttpStatus.OK, "Thông báo đã đọc"));
  } catch (error) {
    return res.status(500).json({ error: "Lỗi cập nhật thông báo" });
  }
};

// import axios from "axios";
// import qs from "qs";
// import CryptoJS from "crypto-js";
// import moment from "moment";
// import { Request, Response } from "express";
// import { successResponse } from "../../utils/response-success.util";
// import { HttpStatus } from "../../domain/enums/http-status.enum";
// import { OrderService } from "../../services/order.service";
// import mongoose from "mongoose";

// const config = {
//   app_id: "2553",
//   key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
//   key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
//   endpoint: "https://sb-openapi.zalopay.vn/v2/create",
// };

// export const PaymentController = {
//   createPayment: async (req: Request, res: Response) => {
//     const { userId, amount } = req.body;
//     const embed_data = {
//       redirecturl: "https://zendo.io.vn/wallet",
//     };

//     const items = [
//       {
//         //sanpham
//       },
//     ];
//     const transID = Math.floor(Math.random() * 1000000);
//     const app_trans_id = `${moment().format("YYMMDD")}_${transID}`;
//     const order = {
//       app_id: config.app_id,
//       app_trans_id,
//       app_user: "user123",
//       app_time: Date.now(),
//       item: JSON.stringify(items),
//       embed_data: JSON.stringify(embed_data),
//       amount: amount,
//       description: `Novasix - Thanh toán order #${transID}`,
//       bank_code: "",
//       callback_url: "https://novasix-be.onrender.com/payment/callback",
//       mac: "",
//     };

//     const data =
//       config.app_id +
//       "|" +
//       order.app_trans_id +
//       "|" +
//       order.app_user +
//       "|" +
//       order.amount +
//       "|" +
//       order.app_time +
//       "|" +
//       order.embed_data +
//       "|" +
//       order.item;
//     order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
//     const result = await axios.post(config.endpoint, null, { params: order });

//     await OrderService.createOrder({
//       userId,
//       amount,
//       status: "pending",
//       transId: app_trans_id,
//     });
//     return res.json(
//       successResponse(HttpStatus.OK, "Tạo QR thanh toán", result.data)
//     );
//   },

//   callback: async (req: Request, res: Response) => {
//     const { data } = req.body;
//     const parsedData = JSON.parse(data);
//     let postData = {
//       app_id: parsedData.app_id,
//       app_trans_id: parsedData.app_trans_id,
//       mac: "",
//     };
//     let dataCheck =
//       postData.app_id + "|" + postData.app_trans_id + "|" + config.key1;
//     postData.mac = CryptoJS.HmacSHA256(dataCheck, config.key1).toString();

//     let postConfig = {
//       method: "post",
//       url: "https://sb-openapi.zalopay.vn/v2/query",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       data: qs.stringify(postData),
//     };

//     const result = await axios(postConfig);

//     if (result.data.return_code === 1) {
//       const status = "success";
//       await OrderService.updateOrderStatus(parsedData.app_trans_id, status);
//     } else {
//       const status = "failed";
//       await OrderService.updateOrderStatus(parsedData.app_trans_id, status);
//     }

//     return res.json({ message: "Callback received successfully" });
//   },
// };

import PayOS from "@payos/node";
import { Request, Response } from "express";
import crypto from "crypto";
import { OrderService } from "../../services/order.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

const payos = new PayOS(
  "9357bdaa-6be9-4c88-8341-ce08aabf0f29",
  "a3144698-2e16-465f-851d-f80b946397c5",
  "4956d88b29f7e6c2bea85441577617cde6d77f8c09835d2e2f540295085bfdd4"
);
const generateOrderCode = (userId: string | number): number => {
  const timestamp = Date.now().toString().slice(-6); // 6 số cuối timestamp
  const idDigits = userId.toString().replace(/\D/g, "").slice(-4); // Lấy 4 số cuối từ userId (bỏ ký tự)
  const orderCodeStr = `${timestamp}${idDigits.padStart(4, "0")}`; // ví dụ: 43001234
  return Number(orderCodeStr);
};
const generateChecksum = (data: any) => {
  const sortedData = Object.keys(data)
    .filter((key) => key !== "signature")
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("&");
  return crypto
    .createHmac(
      "sha256",
      "4956d88b29f7e6c2bea85441577617cde6d77f8c09835d2e2f540295085bfdd4"
    )
    .update(sortedData)
    .digest("hex");
};

export const PaymentController = {
  createPayment: async (req: Request, res: Response) => {
    const { userId, amount } = req.body;
    const orderCode = generateOrderCode(userId);

    const order = {
      amount,
      description: `Thanh toan ${orderCode}`,
      orderCode,
      returnUrl: `http://localhost:5173/wallet`,
      cancelUrl: `http://localhost:5173/wallet`,
    };
    await OrderService.createOrder({
      userId,
      amount,
      status: "pending",
      transId: orderCode,
    });
    const paymentLink = await payos.createPaymentLink(order);

    res.json(
      successResponse(HttpStatus.OK, "Tạo QR thành công", {
        url: paymentLink.checkoutUrl,
      })
    );
  },
};

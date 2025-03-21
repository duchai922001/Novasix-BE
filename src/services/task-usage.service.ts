import moment from "moment";
import { TaskUsage } from "../infrastructure/model/task-usage.model";
import { TaskUsageRepoImpl } from "../infrastructure/repositoriesImpl/task-usage.repositoryImpl";
const taskUsageRepo = new TaskUsageRepoImpl();
export const TaskUsageService = {
  logTaskUsage: async (formData: any) => {
    return await taskUsageRepo.logTaskUsage(formData);
  },
  getMostActiveHour: async (userId: string) => {
    const result = await TaskUsage.aggregate([
      { $match: { userId } },
      { $group: { _id: "$hourSlot", totalDuration: { $sum: "$duration" } } },
      { $sort: { totalDuration: -1 } },
      { $limit: 1 },
    ]);

    if (result.length === 0) return "No data available";
    return {
      timeFrame: `${result[0]._id}:00 - ${result[0]._id + 1}:00`,
      totalDuration: result[0].totalDuration,
    };
  },
  getTaskUsageByHour: async (userId: string) => {
    const today = moment().startOf("day").toDate();
    const tomorrow = moment().add(1, "day").startOf("day").toDate();

    const taskData = await TaskUsage.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: today, $lt: tomorrow }, // Chỉ lấy task trong ngày
        },
      },
      {
        $group: {
          _id: "$hourSlot",
          totalTime: { $sum: "$duration" }, // Tổng thời gian sử dụng
          generic: { $sum: 1 }, // Số lần sử dụng
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Chuyển đổi dữ liệu thành format mong muốn
    const formattedData = taskData.map((item) => ({
      content: `${String(item._id).padStart(2, "0")}:00`,
      totalTime: item.totalTime,
      generic: item.generic,
    }));
    return formattedData;
  },
  // Thống kê theo tuần (Thứ 2, Thứ 3, ...)
  getTaskUsageByWeek: async (userId: string) => {
    const startOfWeek = moment().startOf("isoWeek").toDate();
    const endOfWeek = moment().endOf("isoWeek").toDate();

    const taskData = await TaskUsage.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: startOfWeek, $lte: endOfWeek },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$startTime" }, // 1 = Chủ nhật, 2 = Thứ 2, ..., 7 = Thứ 7
          totalTime: { $sum: "$duration" },
          generic: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Định dạng lại dữ liệu
    const daysMapping: Record<number, string> = {
      1: "Chủ nhật",
      2: "Thứ 2",
      3: "Thứ 3",
      4: "Thứ 4",
      5: "Thứ 5",
      6: "Thứ 6",
      7: "Thứ 7",
    };

    return taskData.map((item) => ({
      content: daysMapping[item._id],
      totalTime: item.totalTime,
      generic: item.generic,
    }));
  },

  // Thống kê theo tháng (Tuần 1, Tuần 2, ...)
  getTaskUsageByMonth: async (userId: string) => {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    const taskData = await TaskUsage.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { $ceil: { $divide: [{ $dayOfMonth: "$startTime" }, 7] } }, // Chia ngày trong tháng thành tuần
          totalTime: { $sum: "$duration" },
          generic: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return taskData.map((item) => ({
      content: `Tuần ${item._id}`,
      totalTime: item.totalTime,
      generic: item.generic,
    }));
  },

  // Thống kê theo năm (Tháng 1, Tháng 2, ...)
  getTaskUsageByYear: async (userId: string) => {
    const startOfYear = moment().startOf("year").toDate();
    const endOfYear = moment().endOf("year").toDate();

    const taskData = await TaskUsage.aggregate([
      {
        $match: {
          userId,
          startTime: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: {
          _id: { $month: "$startTime" }, // Nhóm theo tháng
          totalTime: { $sum: "$duration" },
          generic: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Định dạng lại dữ liệu
    const monthsMapping: Record<number, string> = {
      1: "Tháng 1",
      2: "Tháng 2",
      3: "Tháng 3",
      4: "Tháng 4",
      5: "Tháng 5",
      6: "Tháng 6",
      7: "Tháng 7",
      8: "Tháng 8",
      9: "Tháng 9",
      10: "Tháng 10",
      11: "Tháng 11",
      12: "Tháng 12",
    };

    return taskData.map((item) => ({
      content: monthsMapping[item._id],
      totalTime: item.totalTime,
      generic: item.generic,
    }));
  },
};

import dayjs from "dayjs";
import { DailyRepositoryImpl } from "../infrastructure/repositoriesImpl/daily.repositoryImpl";
import User from "../infrastructure/model/user.model";
import UserPackage from "../infrastructure/model/user-package.model";
import Order from "../infrastructure/model/order.model";

const dailyRepo = new DailyRepositoryImpl();

const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
};

const getDashboardForPeriod = async (
  userId: string,
  period: "week" | "month" | "year"
) => {
  const startOfCurrent = dayjs().startOf(period).toDate();
  const endOfCurrent = dayjs().endOf(period).toDate();
  const startOfPrevious = dayjs().subtract(1, period).startOf(period).toDate();
  const endOfPrevious = dayjs().subtract(1, period).endOf(period).toDate();

  // Xác định phương thức tương ứng dựa trên period
  let getCompletedTaskPeriod, getProcessTaskPeriod;

  switch (period) {
    case "week":
      getCompletedTaskPeriod = dailyRepo.getCompletedTaskWeekly;
      getProcessTaskPeriod = dailyRepo.getProcessTaskWeekly;
      break;
    case "month":
      getCompletedTaskPeriod = dailyRepo.getCompletedTaskMonthly;
      getProcessTaskPeriod = dailyRepo.getProcessTaskMonthly;
      break;
    case "year":
      getCompletedTaskPeriod = dailyRepo.getCompletedTaskYearly;
      getProcessTaskPeriod = dailyRepo.getProcessTaskYearly;
      break;
    default:
      throw new Error("Invalid period type");
  }
  // Gọi các API tương ứng
  const [
    taskSuccessCurrent,
    taskProgressCurrent,
    taskSuccessPrevious,
    taskProgressPrevious,
  ] = await Promise.all([
    getCompletedTaskPeriod(userId, startOfCurrent, endOfCurrent),
    getProcessTaskPeriod(userId, startOfCurrent, endOfCurrent),
    getCompletedTaskPeriod(userId, startOfPrevious, endOfPrevious),
    getProcessTaskPeriod(userId, startOfPrevious, endOfPrevious),
  ]);
  const totalPomodorosCurrent = taskSuccessCurrent.reduce(
    (sum, task) => sum + task.numberOfPomodoros,
    0
  );
  const totalPomodorosPrevious = taskSuccessPrevious.reduce(
    (sum, task) => sum + task.numberOfPomodoros,
    0
  );

  return {
    tasksSuccess: {
      total: taskSuccessCurrent.length,
      percent: calculatePercentageChange(
        taskSuccessCurrent.length,
        taskSuccessPrevious.length
      ),
    },
    tasksProgress: {
      total: taskProgressCurrent.length,
      percent: calculatePercentageChange(
        taskProgressCurrent.length,
        taskProgressPrevious.length
      ),
    },
    totalPomodoros: {
      total: totalPomodorosCurrent,
      percent: calculatePercentageChange(
        totalPomodorosCurrent,
        totalPomodorosPrevious
      ),
    },
  };
};

export const DashboardService = {
  getDashboardDaily: async (userId: string) => {
    const dateNow = dayjs().toDate();
    const dateYesterday = dayjs().subtract(1, "day").toDate();

    const [
      taskDailySuccessToday,
      taskDailyProgressToday,
      taskDailySuccessYesterday,
      taskDailyProgressYesterday,
    ] = await Promise.all([
      dailyRepo.getCompletedTaskDaily(userId, dateNow),
      dailyRepo.getProcessTaskDaily(userId, dateNow),
      dailyRepo.getCompletedTaskDaily(userId, dateYesterday),
      dailyRepo.getProcessTaskDaily(userId, dateYesterday),
    ]);

    const totalPomodorosToday = taskDailySuccessToday.reduce(
      (sum, task) => sum + task.numberOfPomodoros,
      0
    );
    const totalPomodorosYesterday = taskDailySuccessYesterday.reduce(
      (sum, task) => sum + task.numberOfPomodoros,
      0
    );

    return {
      tasksSuccess: {
        total: taskDailySuccessToday.length,
        percent: calculatePercentageChange(
          taskDailySuccessToday.length,
          taskDailySuccessYesterday.length
        ),
      },
      tasksProgress: {
        total: taskDailyProgressToday.length,
        percent: calculatePercentageChange(
          taskDailyProgressToday.length,
          taskDailyProgressYesterday.length
        ),
      },
      totalPomodoros: {
        total: totalPomodorosToday,
        percent: calculatePercentageChange(
          totalPomodorosToday,
          totalPomodorosYesterday
        ),
      },
    };
  },

  getDashboardWeekly: async (userId: string) => {
    return getDashboardForPeriod(userId, "week");
  },

  getDashboardMonthly: async (userId: string) => {
    return getDashboardForPeriod(userId, "month");
  },

  getDashboardYearly: async (userId: string) => {
    return getDashboardForPeriod(userId, "year");
  },
  getDashboardAdmin: async () => {
    const totalUser = await User.countDocuments();
    const userRegisterPackage = await UserPackage.distinct("userId");
    const totalRevenue = await Order.aggregate([
      { $match: { status: "success" } }, // Lọc đơn hàng có status = success
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }, // Tính tổng amount
    ]);
    const analysisPackageTotal = await UserPackage.aggregate([
      {
        $group: {
          _id: { $toObjectId: "$packageId" }, // Chuyển packageId sang ObjectId nếu cần
          value: { $sum: 1 }, // Đếm số lần xuất hiện của mỗi packageId
        },
      },
      {
        $lookup: {
          from: "packages", // Nối bảng Package
          localField: "_id",
          foreignField: "_id",
          as: "packageInfo",
        },
      },
      { $unwind: { path: "$packageInfo", preserveNullAndEmptyArrays: true } }, // Giữ dữ liệu ngay cả khi không có match
      {
        $project: {
          _id: 0,
          name: "$packageInfo.name", // Lấy tên gói
          value: 1, // Giữ lại giá trị đã đếm
        },
      },
    ]);
    const analysisPackageAmount = await UserPackage.aggregate([
      {
        $addFields: {
          packageId: { $toObjectId: "$packageId" }, // Chuyển packageId từ String sang ObjectId nếu cần
        },
      },
      {
        $lookup: {
          from: "packages", // Nối bảng Package
          localField: "packageId",
          foreignField: "_id",
          as: "packageInfo",
        },
      },
      { $unwind: { path: "$packageInfo", preserveNullAndEmptyArrays: true } }, // Tránh mất dữ liệu nếu không tìm thấy package
      {
        $group: {
          _id: "$packageId", // Nhóm theo packageId
          name: { $first: "$packageInfo.name" }, // Lấy tên gói
          totalRevenue: { $sum: "$packageInfo.price" }, // Tính tổng giá trị đã bán
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          value: { $multiply: ["$totalRevenue", 100] }, // Đổi tên cho thống nhất
        },
      },
    ]);

    const tablePackage = await UserPackage.aggregate([
      {
        $addFields: {
          packageId: { $toObjectId: "$packageId" }, // Chuyển packageId từ String sang ObjectId nếu cần
        },
      },
      {
        $lookup: {
          from: "packages", // Nối bảng Package để lấy thông tin gói
          localField: "packageId",
          foreignField: "_id",
          as: "packageInfo",
        },
      },
      { $unwind: { path: "$packageInfo", preserveNullAndEmptyArrays: true } }, // Tránh mất dữ liệu nếu không tìm thấy package
      {
        $group: {
          _id: "$packageId", // Nhóm theo packageId
          name: { $first: "$packageInfo.name" }, // Lấy tên gói
          sumAmountPackage: { $sum: "$packageInfo.price" }, // Tổng tiền bán được
          countBuyPackage: { $sum: 1 }, // Số lần gói được mua
        },
      },
      { $sort: { countBuyPackage: -1 } }, // Sắp xếp giảm dần theo số lần mua
      {
        $project: {
          _id: 0,
          name: 1,
          sumAmountPackage: 1,
          countBuyPackage: 1,
        },
      },
    ]);

    return {
      totalUser,
      userRegisterPackage: userRegisterPackage?.length,
      totalRevenue: totalRevenue?.[0]?.totalRevenue ?? 0,
      analysisPackageAmount,
      analysisPackageTotal,
      tablePackage,
    };
  },
};

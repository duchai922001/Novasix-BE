import dayjs from "dayjs";
import { DailyRepositoryImpl } from "../infrastructure/repositoriesImpl/daily.repositoryImpl";

const dailyRepo = new DailyRepositoryImpl();

const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
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

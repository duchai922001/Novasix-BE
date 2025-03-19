import cron from "node-cron";
import User from "../infrastructure/model/user.model";

/**
 * Reset nhiệm vụ hằng ngày
 */
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Reset daily tasks...");
  await User.updateMany(
    {},
    { tasksCompleted: 0, pomodoroUsed: 0, gratitudeEntries: 0 }
  );
  console.log("✅ Daily reset completed!");
});

/**
 * Reset nhiệm vụ hằng tuần (Thứ 2 mỗi tuần)
 */
cron.schedule("0 0 * * 1", async () => {
  console.log("🔄 Reset weekly tasks...");
  await User.updateMany({}, { weeklyReflections: 0, weeklyPomodoroUsed: 0 });
  console.log("✅ Weekly reset completed!");
});

/**
 * Reset nhiệm vụ hằng tháng (Ngày 1 mỗi tháng)
 */
cron.schedule("0 0 1 * *", async () => {
  console.log("🔄 Reset monthly tasks...");
  await User.updateMany({}, { monthlyPomodoroUsed: 0 });
  console.log("✅ Monthly reset completed!");
});

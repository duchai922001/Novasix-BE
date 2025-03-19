import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { AchivementRepositoryImpl } from "../infrastructure/repositoriesImpl/achivement.repositoryImpl";
import { UserRepoImpl } from "../infrastructure/repositoriesImpl/user.repositoryImpl";

const userRepo = new UserRepoImpl();
const achivementRepo = new AchivementRepositoryImpl();
export const AchivementService = {
  updateDailyTask: async (
    userId: string,
    formData: {
      tasksCompleted: number;
      pomodoroUsed: number;
      gratitudeEntries: number;
    }
  ) => {
    const user = await userRepo.findUserById(userId);
    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng");
    }
    user.tasksCompleted += formData.tasksCompleted;
    user.dailyPomodoroUsed += formData.pomodoroUsed;
    user.gratitudeEntries += formData.gratitudeEntries;

    const achievements = await achivementRepo.getAllAchivement();
    achievements.forEach((ach) => {
      if (user.tasksCompleted >= ach.unlockCondition) {
        user.point += ach.giftPoint;
      }
    });
    const data = await user.save();
    return data;
  },
  updateWeeklyTask: async (
    userId: string,
    formData: {
      weeklyReflections: number;
      weeklyPomodoroUsed: number;
    }
  ) => {
    const user = await userRepo.findUserById(userId);
    if (!user) {
      throw new NotFoundException("Không tìm thấy người dùng");
    }

    user.weeklyReflections += formData.weeklyReflections;
    user.weeklyPomodoroUsed += formData.weeklyPomodoroUsed;

    const data = await user.save();
    return data;
  },
};

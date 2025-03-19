import { IPomodoro } from "../infrastructure/model/pomodoro.model";
import { PomodoroRepositoryImpl } from "../infrastructure/repositoriesImpl/pomodoro.repositoryImpl";

const pomodoroRepo = new PomodoroRepositoryImpl();
export const PomodoroService = {
  createPomodoro: async (data: IPomodoro) => {
    return await pomodoroRepo.createPomodoro(data);
  },
  getPomodoroByUser: async (userId: string) => {
    return await pomodoroRepo.getPomodoroByUser(userId);
  },
};

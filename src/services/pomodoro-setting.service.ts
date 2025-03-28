import { IPomodoroSetting } from "../infrastructure/model/pomodoro-setting.model";
import { PomodoroSettingRepositoryImpl } from "../infrastructure/repositoriesImpl/promotion-setting.repositoryImpl";

const pomodoroSettingRepo = new PomodoroSettingRepositoryImpl();
export const PomodoroSettingService = {
  create: async (data: IPomodoroSetting) => {
    return await pomodoroSettingRepo.create(data);
  },
  getAll: async () => {
    return await pomodoroSettingRepo.getAll();
  },
  delete: async (id: string) => {
    return await pomodoroSettingRepo.delete(id);
  },
  update: async (id: string, formData: any) => {
    return await pomodoroSettingRepo.update(id, formData);
  },
};

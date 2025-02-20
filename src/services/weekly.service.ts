import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { WeeklyRepositoryImpl } from "../infrastructure/repositoriesImpl/weekly.repositoryImpl";
import { WeeklyTaskDTO } from "../presentations/dtos/weekly/weekly-task.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

interface IFormTaskWeek {
  name: string;
  type: string;
}
const weeklyRepo = new WeeklyRepositoryImpl();
export const WeeklyService = {
  createTaskWeek: async (task: IFormTaskWeek) => {
    const dataTaskWeekDTO = await createAndValidateDto(WeeklyTaskDTO, task);
    return await weeklyRepo.createTaskWeek(dataTaskWeekDTO);
  },

  getWeeklyTask: async (userId: string, dateWeek: string) => {
    return weeklyRepo.getTaskWeek(userId, dateWeek);
  },

  updateWeeklyTask: async (id: string, data: any) => {
    const dataWeeklyTaskDTO = await createAndValidateDto(WeeklyTaskDTO, data);
    const findWeeklyTask = await weeklyRepo.findDailyTaskById(id);
    if (!findWeeklyTask) {
      throw new NotFoundException("Không tìm thấy task vụ này");
    }
    return await weeklyRepo.updateDailyTask(id, dataWeeklyTaskDTO);
  },
};

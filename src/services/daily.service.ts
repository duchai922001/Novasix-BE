import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { DailyRepositoryImpl } from "../infrastructure/repositoriesImpl/daily.repositoryImpl";
import { DailyTaskDTO } from "../presentations/dtos/daily/daily-task.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const DailyTaskRepo = new DailyRepositoryImpl();
export const DailyTaskService = {
  createDailyTask: async (data: any) => {
    const dataDailyTaskDTO = await createAndValidateDto(DailyTaskDTO, data);
    return await DailyTaskRepo.createTaskDaily(dataDailyTaskDTO);
  },

  updateDailyTask: async (id: string, data: any) => {
    const dataDailyTaskDTO = await createAndValidateDto(DailyTaskDTO, data);
    const findDailyTask = await DailyTaskRepo.findDailyTaskById(id);
    if (!findDailyTask) {
      throw new NotFoundException("Không tìm thấy task vụ này");
    }
    return await DailyTaskRepo.updateDailyTask(id, dataDailyTaskDTO);
  },
  deleteDailyTask: async (id: string) => {
    const result = await DailyTaskRepo.deleteDailyTask(id);
    if (result) {
      return true;
    } else {
      throw new BadRequestException("Lỗi trong quá trình xóa");
    }
  },
  getTaskDaily: async (date: string | Date) => {
    const taskDaily = await DailyTaskRepo.getProcessTaskDaily(date);
    return taskDaily;
  },
  getTaskDoneDaily: async (date: string | Date) => {
    const taskDaily = await DailyTaskRepo.getCompletedTaskDaily(date);
    return taskDaily;
  },
};

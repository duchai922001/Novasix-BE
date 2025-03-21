import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { DailyRepositoryImpl } from "../infrastructure/repositoriesImpl/daily.repositoryImpl";
import { UserRepoImpl } from "../infrastructure/repositoriesImpl/user.repositoryImpl";
import { WalletRepositoryImpl } from "../infrastructure/repositoriesImpl/wallet.repositoryImpl";
import { DailyTaskDTO } from "../presentations/dtos/daily/daily-task.dto";
import { UpdateDailyTaskDTO } from "../presentations/dtos/daily/update.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const DailyTaskRepo = new DailyRepositoryImpl();
const userRepo = new UserRepoImpl();
export const DailyTaskService = {
  createDailyTask: async (data: any) => {
    const findUser = await userRepo.findUserById(data.userId);
    if (!findUser) {
      throw new NotFoundException("Không tìm thấy người dùng hợp lệ");
    }
    if (!findUser?.onBoardDaily) {
      await userRepo.updateMissionUser(data.userId, {
        onBoardDaily: 1,
        totalTasks: 1,
      });
    }
    const tasksCount = findUser?.totalTasks + 1;
    await userRepo.updateMissionUser(data.userId, { totalTasks: tasksCount });
    const dataDailyTaskDTO = await createAndValidateDto(DailyTaskDTO, data);
    return await DailyTaskRepo.createTaskDaily(dataDailyTaskDTO);
  },

  updateDailyTask: async (id: string, data: any) => {
    const dataDailyTaskDTO = await createAndValidateDto(
      UpdateDailyTaskDTO,
      data
    );
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
  getTaskDaily: async (userId: string, date: string | Date) => {
    const taskDaily = await DailyTaskRepo.getProcessTaskDaily(userId, date);
    return taskDaily;
  },
  getTaskDoneDaily: async (userId: string, date: string | Date) => {
    const taskDaily = await DailyTaskRepo.getCompletedTaskDaily(userId, date);
    return taskDaily;
  },

  getTaskById: async (taskId: string) => {
    return await DailyTaskRepo.findDailyTaskById(taskId);
  },
};

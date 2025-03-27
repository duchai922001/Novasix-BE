import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { UserRepoImpl } from "../infrastructure/repositoriesImpl/user.repositoryImpl";

const userRepo = new UserRepoImpl();
export const UserService = {
  updateMissionUser: async (userId: string, formData: any) => {
    return await userRepo.updateMissionUser(userId, formData);
  },
  getUserCurrent: async (userId: string) => {
    return await userRepo.getUserCurrent(userId);
  },
  updateUser: async (userId: string, formData: any) => {
    return await userRepo.updateUser(userId, formData);
  },
  getAllUser: async () => {
    return await userRepo.getAllUser();
  },
  actionIsActiveUser: async (userId: string) => {
    const findUser = await userRepo.findUserById(userId);
    if (!findUser) {
      throw new NotFoundException("Người dùng không tồn tại");
    }
    if (findUser.isActive) {
      await userRepo.updateUser(userId, { isActive: false });
      return {
        action: "banned",
        username: findUser.username,
      };
    }
    if (!findUser.isActive) {
      await userRepo.updateUser(userId, { isActive: true });
      return {
        action: "unbanned",
        username: findUser.username,
      };
    }
  },
};

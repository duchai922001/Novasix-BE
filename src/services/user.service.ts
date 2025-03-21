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
};

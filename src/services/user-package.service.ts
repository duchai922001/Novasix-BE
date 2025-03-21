import { UserPackageRepoImpl } from "../infrastructure/repositoriesImpl/user-package.repositoryImpl";

const userPackageRepo = new UserPackageRepoImpl();
export const UserPackageService = {
  getPackagesUser: async (userId: string) => {
    return await userPackageRepo.getPackagesUser(userId);
  },
  buyPackage: async (formData: { userId: string; typePackage: string }) => {
    return await userPackageRepo.buyPackage(formData);
  },
};

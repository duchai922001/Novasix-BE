import { PackageRepoImpl } from "../infrastructure/repositoriesImpl/package.repositoryImpl";

const packageRepo = new PackageRepoImpl();
export const PackageService = {
  createPackage: async (formData: any) => {
    return await packageRepo.createPackage(formData);
  },
  getPackages: async () => {
    return await packageRepo.getPackages();
  },
};

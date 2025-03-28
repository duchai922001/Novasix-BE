import UserPackage from "../infrastructure/model/user-package.model";
import { UserPackageRepoImpl } from "../infrastructure/repositoriesImpl/user-package.repositoryImpl";

const userPackageRepo = new UserPackageRepoImpl();
export const UserPackageService = {
  getPackagesUser: async (userId: string) => {
    const userPackages = await UserPackage.find({ userId }).populate(
      "packageId"
    );

    // ✅ Lấy danh sách `typePackage` từ các gói đã đăng ký
    const typePackage = userPackages.map(
      (item) => (item.packageId as any).typePackage
    );

    // ✅ Tạo Set để không bị trùng lặp khi add thêm gói
    const packageSet = new Set(typePackage);

    // ✅ Nếu có 'weekly' hoặc 'monthly' thì add 'normal'
    if (packageSet.has("weekly") || packageSet.has("monthly")) {
      packageSet.add("normal");
      packageSet.add("premium");
    }

    // ✅ Nếu có đủ cả ba ('dashboard', 'weekly', 'monthly') thì add 'premium'
    if (
      packageSet.has("dashboard") &&
      packageSet.has("weekly") &&
      packageSet.has("monthly")
    ) {
      packageSet.add("premium");
    }

    // ✅ Convert Set về mảng để trả về FE
    const finalPackages = Array.from(packageSet);

    return finalPackages;
  },
  buyPackage: async (formData: { userId: string; typePackage: string }) => {
    return await userPackageRepo.buyPackage(formData);
  },
};

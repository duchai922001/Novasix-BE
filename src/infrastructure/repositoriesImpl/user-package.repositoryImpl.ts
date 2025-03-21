import { PackageType } from "../../domain/enums/package-type.enum";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../../domain/exceptions/not-found.exception";
import { IUserPackageRepository } from "../../domain/repositories/user-package.repository";
import Package from "../model/package.model";
import UserPackage, { IUserPackage } from "../model/user-package.model";
import Wallet from "../model/wallet.model";

export class UserPackageRepoImpl implements IUserPackageRepository {
  async getPackagesUser(userId: string): Promise<IUserPackage[]> {
    return await UserPackage.find({ userId }).populate("packageId");
  }
  async getPackagesByType(type: string): Promise<string[]> {
    const packages = await Package.find({ typePackage: type });
    return packages.map((pkg) => String(pkg._id));
  }
  async buyPackage(formData: any): Promise<IUserPackage[]> {
    const { userId, typePackage } = formData;
    let packageIds: string[] = [];

    if (typePackage === PackageType.DASHBOARD) {
      packageIds = await this.getPackagesByType(PackageType.DASHBOARD);
    } else if (typePackage === PackageType.WEEKLY) {
      packageIds = await this.getPackagesByType(PackageType.WEEKLY);
    } else if (typePackage === PackageType.MONTHLY) {
      packageIds = await this.getPackagesByType(PackageType.MONTHLY);
    } else if (typePackage === PackageType.PREMIUM) {
      packageIds = [
        ...(await this.getPackagesByType(PackageType.DASHBOARD)),
        ...(await this.getPackagesByType(PackageType.WEEKLY)),
        ...(await this.getPackagesByType(PackageType.MONTHLY)),
      ];
    } else if (typePackage === PackageType.NORMAL) {
      packageIds = [
        ...(await this.getPackagesByType(PackageType.WEEKLY)),
        ...(await this.getPackagesByType(PackageType.MONTHLY)),
      ];
    }

    if (!packageIds.length) {
      throw new NotFoundException("Không tìm thấy package hợp lệ");
    }

    // 🔥 Lấy thông tin ví của user
    const userWallet = await Wallet.findOne({ userId });
    if (!userWallet) {
      throw new NotFoundException("Không tìm thấy ví của user");
    }

    // 🔥 Tính tổng số tiền cần trừ
    let totalCost = 0;
    const packages = await Package.find({ _id: { $in: packageIds } });
    packages.forEach((pkg) => {
      totalCost += pkg.price; // Giả sử package có field `price`
    });

    // 🔥 Kiểm tra số dư
    if (userWallet.balance < totalCost) {
      throw new BadRequestException("Số dư trong ví không đủ");
    }

    const purchasedPackages: IUserPackage[] = [];
    for (const packageId of packageIds) {
      const selectedPackage = await Package.findById(packageId);
      if (!selectedPackage) continue;

      let userPackage = await UserPackage.findOne({
        userId,
        packageId,
        status: "active",
      });

      if (userPackage) {
        userPackage.endDate.setMonth(
          userPackage.endDate.getMonth() + selectedPackage.timeExp
        );
        await userPackage.save();
      } else {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + selectedPackage.timeExp);

        userPackage = new UserPackage({
          userId,
          packageId,
          startDate,
          endDate,
          status: "active",
        });

        await userPackage.save();
      }

      purchasedPackages.push(userPackage);
    }

    // 🔥 Trừ tiền trong ví sau khi mua thành công
    userWallet.balance -= totalCost;
    await userWallet.save();

    return purchasedPackages;
  }
}

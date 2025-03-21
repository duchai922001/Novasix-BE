import { IPackageRepository } from "../../domain/repositories/package.repository";
import Package, { IPackage } from "../model/package.model";

export class PackageRepoImpl implements IPackageRepository {
  async createPackage(formData: IPackage): Promise<IPackage> {
    return await Package.create(formData);
  }
  async getPackages(): Promise<IPackage[]> {
    return await Package.find();
  }
}

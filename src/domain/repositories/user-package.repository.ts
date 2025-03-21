import { IUserPackage } from "../../infrastructure/model/user-package.model";

export interface IUserPackageRepository {
  buyPackage(formData: any): Promise<IUserPackage[]>;
  getPackagesUser(userId: string): Promise<IUserPackage[]>;
  getPackagesByType(type: string): Promise<string[]>;
}

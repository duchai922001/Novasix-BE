import { IPackage } from "../../infrastructure/model/package.model";

export interface IPackageRepository {
  createPackage(formData: IPackage): Promise<IPackage>;
  getPackages(): Promise<IPackage[]>;
}

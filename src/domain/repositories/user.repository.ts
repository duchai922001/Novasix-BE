import { IUser } from "../../infrastructure/model/user.model";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUserByUsername(username: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
  updateMissionUser(userId: string, formData: any): Promise<IUser | null>;
  getUserCurrent(userId: string): Promise<IUser | null>;
  updateUser(userId: string, formData: any): Promise<IUser | null>;
  getAllUser(): Promise<IUser[]>;
}

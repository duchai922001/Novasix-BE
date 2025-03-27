import { IUserRepository } from "../../domain/repositories/user.repository";
import User, { IUser } from "../model/user.model";

export class UserRepoImpl implements IUserRepository {
  async getAllUser(): Promise<IUser[]> {
    return await User.find({ role: "customer" });
  }
  async updateUser(userId: string, formData: any): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, formData);
  }
  async getUserCurrent(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
  async updateMissionUser(
    userId: string,
    formData: any
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, formData);
  }
  async findUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }
  async findUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }
  async createUser(user: IUser): Promise<IUser> {
    return await User.create(user);
  }
}

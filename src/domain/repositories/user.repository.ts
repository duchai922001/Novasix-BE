import { IUser } from "../../infrastructure/model/user.model";

export interface IUserRepository {
  createUser(user: IUser): Promise<IUser>;
  findUserByUsername(username: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
}

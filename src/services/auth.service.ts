import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { IUser } from "../infrastructure/model/user.model";
import { UserRepoImpl } from "../infrastructure/repositoriesImpl/user.repositoryImpl";
import { LoginDTO } from "../presentations/dtos/auth/login.dto";
import { RegisterDTO } from "../presentations/dtos/auth/register.dto";
import { ILogin } from "../types/login.interface";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userRepo = new UserRepoImpl();
export const AuthService = {
  register: async (user: IUser) => {
    const dataRegisterDTO = await createAndValidateDto(RegisterDTO, user);
    const existedUser = await userRepo.findUserByUsername(
      dataRegisterDTO.username
    );
    if (existedUser) {
      throw new BadRequestException("Tài khoản đã tồn tại");
    }

    const existedEmail = await userRepo.findUserByEmail(dataRegisterDTO.email);
    if (existedEmail) {
      throw new BadRequestException("Email này đã được đăng ký");
    }
    const hashPassword = await bcrypt.hash(dataRegisterDTO.password, 10);
    return await userRepo.createUser({
      ...dataRegisterDTO,
      password: hashPassword,
    });
  },

  login: async (formData: ILogin) => {
    const dataLogin = await createAndValidateDto(LoginDTO, formData);
    const user = await userRepo.findUserByUsername(dataLogin.username);
    if (!user) {
      throw new BadRequestException("Tài khoản hoặc mật khẩu không đúng");
    }

    const isMatch = await bcrypt.compare(dataLogin.password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Tài khoản hoặc mật khẩu không đúng");
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );
    const { password: _, ...userWithoutPassword } = user.toObject();
    return {
      ...userWithoutPassword,
      access_token: token,
    };
  },
};

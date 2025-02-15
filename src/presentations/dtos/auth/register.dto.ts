import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty({ message: "Tên đăng nhập bắt buộc nhập" })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu bắt buộc nhập" })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: "Tên bắt buộc nhập" })
  name!: string;

  @IsEmail({}, { message: "Email không đúng format" })
  @IsNotEmpty({ message: "Email bắt buộc nhập" })
  email!: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

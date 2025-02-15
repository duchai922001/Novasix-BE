import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
  @IsString()
  @IsNotEmpty({ message: "Tên đăng nhập không được để trống" })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: "Mật khẩu không được để trống" })
  password!: string;
}

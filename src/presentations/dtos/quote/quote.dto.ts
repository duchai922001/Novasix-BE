import { IsNotEmpty, IsString } from "class-validator";

export class QuoteDTO {
  @IsString()
  @IsNotEmpty({ message: "image không được để trống" })
  image!: string;

  @IsString()
  @IsNotEmpty({ message: "description không được để trống" })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: "author không được để trống" })
  author!: string;
}

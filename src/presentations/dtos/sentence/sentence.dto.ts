import { IsNotEmpty, IsString } from "class-validator";

export class SentenceDTO {
  @IsString()
  @IsNotEmpty({ message: "script không được để trống" })
  script!: string;
}

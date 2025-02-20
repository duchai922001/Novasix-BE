import { IsNotEmpty, IsString } from "class-validator";

export class MonthEventDTO {
  @IsString()
  @IsNotEmpty({ message: "Ghi chú không để trống" })
  note!: string;

  @IsString()
  @IsNotEmpty({ message: "Ngày không để trống" })
  dateTime!: string;
}

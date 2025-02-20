import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { TypeTask } from "../../../domain/enums/type-task.enum";

export class WeeklyTaskDTO {
  @IsString()
  @IsNotEmpty({ message: "Tên không để trống" })
  name!: string;

  @IsBoolean()
  @IsOptional()
  isChecked?: boolean;

  @IsEnum(TypeTask, { message: "Loại công việc không hợp lệ" })
  type!: TypeTask;
}

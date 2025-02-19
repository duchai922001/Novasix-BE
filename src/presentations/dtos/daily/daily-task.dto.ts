import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { TypeTask } from "../../../domain/enums/type-task.enum";
import { StatusTask } from "../../../domain/enums/status-task.enum";

export class DailyTaskDTO {
  @IsString()
  @IsNotEmpty({ message: "Tiêu đề không được để trống" })
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  attachedFile?: string;

  @IsNumber()
  numberOfPomodoros?: number;

  @IsEnum(TypeTask, { message: "Loại công việc không hợp lệ" })
  type!: TypeTask;

  @IsEnum(StatusTask, { message: "Trạng thái không hợp lệ" })
  @IsOptional()
  status?: StatusTask;
}

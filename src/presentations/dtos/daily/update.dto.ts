import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { TypeTask } from "../../../domain/enums/type-task.enum";
import { StatusTask } from "../../../domain/enums/status-task.enum";

export class UpdateDailyTaskDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  attachedFile?: string;

  @IsNumber()
  @IsOptional()
  numberOfPomodoros?: number;

  @IsOptional()
  @IsEnum(TypeTask, { message: "Loại công việc không hợp lệ" })
  type?: TypeTask;

  @IsEnum(StatusTask, { message: "Trạng thái không hợp lệ" })
  @IsOptional()
  status?: StatusTask;
}

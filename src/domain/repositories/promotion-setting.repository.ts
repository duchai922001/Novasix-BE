import { IPomodoroSetting } from "../../infrastructure/model/pomodoro-setting.model";

export interface IPomodoroSettingRepository {
  create(data: IPomodoroSetting): Promise<IPomodoroSetting>;
  getAll(): Promise<IPomodoroSetting[]>;
  delete(id: string): Promise<boolean | null>;
  update(id: string, formData: any): Promise<IPomodoroSetting | null>;
}

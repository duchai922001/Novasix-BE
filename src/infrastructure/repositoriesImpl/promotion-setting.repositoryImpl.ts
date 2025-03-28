import { IPomodoroSettingRepository } from "../../domain/repositories/promotion-setting.repository";
import PomodoroSetting, {
  IPomodoroSetting,
} from "../model/pomodoro-setting.model";

export class PomodoroSettingRepositoryImpl
  implements IPomodoroSettingRepository
{
  async getAll(): Promise<IPomodoroSetting[]> {
    return await PomodoroSetting.find();
  }
  async delete(id: string): Promise<boolean | null> {
    return await PomodoroSetting.findByIdAndDelete(id);
  }
  async update(id: string, formData: any): Promise<IPomodoroSetting | null> {
    return await PomodoroSetting.findByIdAndUpdate(id, formData, { new: true });
  }
  async create(data: IPomodoroSetting): Promise<IPomodoroSetting> {
    return await PomodoroSetting.create(data);
  }
}

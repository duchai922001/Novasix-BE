import { IPomodoroRepository } from "../../domain/repositories/pomodoro.repository";
import Pomodoro, { IPomodoro } from "../model/pomodoro.model";

export class PomodoroRepositoryImpl implements IPomodoroRepository {
  async getPomodoroByUser(userId: string): Promise<IPomodoro | null> {
    return await Pomodoro.findOne({ userId });
  }
  async createPomodoro(data: IPomodoro): Promise<IPomodoro> {
    return await Pomodoro.create(data);
  }
}

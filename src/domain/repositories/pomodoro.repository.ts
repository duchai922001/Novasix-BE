import { IPomodoro } from "../../infrastructure/model/pomodoro.model";

export interface IPomodoroRepository {
  createPomodoro(data: IPomodoro): Promise<IPomodoro>;
  getPomodoroByUser(userId: string): Promise<IPomodoro | null>;
}

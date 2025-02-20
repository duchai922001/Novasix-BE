import { IMonthlyEvent } from "../../infrastructure/model/monthly_event.model";

export interface IMonthlyRepository {
  createEvent(task: IMonthlyEvent): Promise<IMonthlyEvent>;
  getEventMonthly(
    userId: string,
    currentYear: string,
    currentMonth: string
  ): Promise<IMonthlyEvent[]>;
}

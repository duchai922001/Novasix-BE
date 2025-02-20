import dayjs from "dayjs";
import { IMonthlyRepository } from "../../domain/repositories/monthly.repository";
import MonthlyEvent, { IMonthlyEvent } from "../model/monthly_event.model";

export class MonthlyRepositoryImpl implements IMonthlyRepository {
  async createEvent(event: IMonthlyEvent): Promise<IMonthlyEvent> {
    return await MonthlyEvent.create(event);
  }
  async getEventMonthly(
    userId: string,
    currentYear: string,
    currentMonth: string
  ): Promise<IMonthlyEvent[]> {
    const monthStart = dayjs(`${currentYear}-${currentMonth}-01`)
      .startOf("month")
      .toISOString();
    const monthEnd = dayjs(`${currentYear}-${currentMonth}-01`)
      .endOf("month")
      .toISOString();

    return await MonthlyEvent.find({
      userId: userId,
      dateTime: { $gte: monthStart, $lte: monthEnd },
    }).exec();
  }
}

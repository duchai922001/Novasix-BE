import { MonthlyRepositoryImpl } from "../infrastructure/repositoriesImpl/monthly.repositoryImpl";
import { MonthEventDTO } from "../presentations/dtos/monthly/event-month.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

interface IFormEventMonth {
  note: string;
}
const monthRepo = new MonthlyRepositoryImpl();
export const MonthEventService = {
  createEvent: async (formData: IFormEventMonth) => {
    const dataEventMonthDTO = await createAndValidateDto(
      MonthEventDTO,
      formData
    );
    return await monthRepo.createEvent(dataEventMonthDTO);
  },
  getEventMonthly: async (
    userId: string,
    currentYear: string,
    currentMonth: string
  ) => {
    return await monthRepo.getEventMonthly(userId, currentYear, currentMonth);
  },
};

import { format } from "date-fns";
import { ReservationsService } from "../services/ReservationsService";

export type CheckCalendarDisableBookingDto = {
  checkDate: Date;
  startBookingDate?: Date;
  bookingId?: string;
}

export class CheckCalendarDisableBooking {
  constructor(
    private reservationsService: ReservationsService,
  ) { }

  execute(checkCalendarDisableBookingDto: CheckCalendarDisableBookingDto) {
    const { checkDate, startBookingDate } = checkCalendarDisableBookingDto;
    const dateIsInPast = checkDate < new Date();

    if (dateIsInPast) {
      return true;
    }

    if (startBookingDate) {
      const result = this.reservationsService.getBookingBeforeAndAfter(startBookingDate, checkCalendarDisableBookingDto.bookingId); 
      const isAfterAnyBooking = result.after ? checkDate >= result.after.dateStart : false;
      const isBeforeAnyBooking = result.before ? checkDate <= result.before.dateEnd : false;
      return isAfterAnyBooking || isBeforeAnyBooking;
    }

    const conflictingBookings = this.reservationsService.getBookingsConflicting(checkDate, checkDate, checkCalendarDisableBookingDto.bookingId);

    return conflictingBookings.length > 0; 
  }
}

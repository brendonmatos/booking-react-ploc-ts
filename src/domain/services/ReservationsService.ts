import { Booking } from "../entity/Booking";
import { ReactiveValue } from "../entity/Observable";

export interface ReservationsService {
  getNextReservationCode(): string;

  findBookingById(id: string): Booking | undefined;

  saveBooking(booking: Booking): void;

  removeBooking(id: string): void;

  getBookingBeforeAndAfter(date: Date, exceptBookingId?: string): { before: Booking | undefined, after: Booking | undefined };

  getBookingsConflicting(dateStart: Date, dateEnd: Date, exceptBookingId?: string): Booking[];

  listBookings(): ReactiveValue<Booking[]>;
}



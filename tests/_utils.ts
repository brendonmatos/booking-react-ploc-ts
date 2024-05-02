import { ReservationsService } from "../src/domain/services/ReservationsService";
import { Place } from "../src/domain/entity/Calendar";
import { expect } from "vitest";

export function helpCreateBookings(reservationService: ReservationsService, dates: { start: Date; end: Date; }[]) {
  for (const date of dates) {
    reservationService.saveBooking({
      dateEnd: date.end,
      dateStart: date.start,
      personName: 'HeyMan',
      id: reservationService.getNextReservationCode(),
      place: new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
    });
  }
}

export function helpCheckDisabled (checkCalendarDisableBooking: CheckCalendarDisableBooking, expected: {
  [date: string]: boolean
}, startBookingDate?: Date) {

  const newObject: { [date: string]: boolean } = {}
  for (const date in expected) {
    newObject[date] = checkCalendarDisableBooking.execute({
      checkDate: new Date(date),
      startBookingDate,
    })
  }

  expect(newObject).toMatchObject(expected)
}
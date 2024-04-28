import { DateOverlapError } from "../exceptions";
import { Booking } from "./Booking";
import Observable from "./Observable";


export class Calendar extends Observable {
  bookings: Booking[] = [];

  verifyAvailabilityFor(toBeVerifiedBooking: Booking) {
    return this.bookings
      .filter(booking => booking.id !== toBeVerifiedBooking.id)
      .every(booking => {
        const isAfterEnd = booking.dateEnd < toBeVerifiedBooking.dateStart;
        const isBeforeStart = booking.dateStart > toBeVerifiedBooking.dateEnd;
        const isAvailable = isAfterEnd || isBeforeStart;
        return isAvailable;
      });
  }

  dateIsAfterAnyBookingAfterDate(date: Date, afterDate: Date = new Date()) {
    return this.bookings
      .filter(booking => booking.dateStart > afterDate)
      .some(booking => booking.dateEnd < date);
  }

  dateIsBeforeAnyBookingBeforeDate(date: Date, beforeDate: Date = new Date()) {
    return this.bookings
      .filter(booking => booking.dateEnd < beforeDate)
      .some(booking => booking.dateEnd > date);
  }

  existsBooking(booking: Booking) {
    return this.bookings.some(b => b.id === booking.id);
  }

  saveBooking(booking: Booking) {
    if (!this.verifyAvailabilityFor(booking)) {
      throw new DateOverlapError();
    }

    const index = this.bookings.findIndex(b => b.id === booking.id);

    if (index !== -1) {
      this.bookings[index] = booking;
      this.notify(new Event('bookingUpdated'));
      return;
    }

    this.bookings.push(booking);
    this.notify(new Event('bookingAdded'));
  }

  removeBooking(booking: Booking) {
    this.bookings = this.bookings.filter(b => b.id !== booking.id);
    this.notify(new Event('bookingRemoved'));
  }

}

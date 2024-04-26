export class DomainError extends Error {
  static is(error: Error): error is DomainError {
    return error instanceof DomainError;
  }
}

export class DateOverlapError extends DomainError {
  constructor() {
    super('Date overlap error. The booking dates overlap with an existing booking.');
  }
}

export class InvalidDateError extends DomainError {
  constructor() {
    super('Invalid date error. The booking dates are invalid.');
  }
}

export class BookingNotFoundError extends DomainError {
  constructor() {
    super('Booking not found error. The booking does not exist.');
  }
}

export class Booking {
  constructor(
    public id: string,
    public dateStart: Date,
    public dateEnd: Date
  ) {}
}

export class Calendar {
  bookings: Booking[] = [];  

  verifyAvailabilityFor(toBeVerifiedBooking: Booking) {
    return this.bookings
      .filter(booking => booking.id !== toBeVerifiedBooking.id)  
      .every(booking => {
        const isAvailable = booking.dateStart > toBeVerifiedBooking.dateEnd || booking.dateEnd < toBeVerifiedBooking.dateStart;
        return isAvailable;
      });
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
      return;
    }

    this.bookings.push(booking);
  }

  removeBooking(booking: Booking) {
    this.bookings = this.bookings.filter(b => b.id !== booking.id);
  }

}

export class TheHotelRoom {
  calendar = new Calendar();
}

export class EditBooking {
  constructor(
    private theHotelRoom: TheHotelRoom
  ) {}

  execute(booking: Booking) {
    if (booking.dateStart >= booking.dateEnd) {
      throw new InvalidDateError();
    }

    if (!this.theHotelRoom.calendar.existsBooking(booking)) {
      throw new BookingNotFoundError();
    }

    this.theHotelRoom.calendar.saveBooking(booking);
  }
}

export class CreateBooking {
  constructor(
    private theHotelRoom: TheHotelRoom
  ) {}

  execute(booking: Booking) {
    if (booking.dateStart >= booking.dateEnd) {
      throw new InvalidDateError();
    }

    if (!this.theHotelRoom.calendar.verifyAvailabilityFor(booking)) {
      throw new DateOverlapError();
    }

    this.theHotelRoom.calendar.saveBooking(booking);
  }
}

export class RemoveBooking {
  constructor(
    private theHotelRoom: TheHotelRoom
  ) {}

  execute(booking: Booking) {
    if (!this.theHotelRoom.calendar.existsBooking(booking)) {
      throw new BookingNotFoundError();
    }

    this.theHotelRoom.calendar.removeBooking(booking);
  }
}

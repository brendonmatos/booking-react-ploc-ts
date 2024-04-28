import { Booking } from "../entity/Booking";
import { TheHotelRoom } from "../entity/TheHotelRoom";
import { BookingNotFoundError } from "../exceptions";


export class RemoveBooking {
  constructor(
    private theHotelRoom: TheHotelRoom
  ) { }

  execute(booking: Booking) {
    if (!this.theHotelRoom.calendar.existsBooking(booking)) {
      throw new BookingNotFoundError();
    }

    this.theHotelRoom.calendar.removeBooking(booking);
  }
}

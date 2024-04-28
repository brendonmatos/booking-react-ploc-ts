import { BookingNotFoundError, InvalidDateError } from "../exceptions";
import { Booking } from "../entity/Booking";
import { TheHotelRoom } from "../entity/TheHotelRoom";
import { EditBookingDto } from "./EditBookingDto";


export class EditBooking {
  constructor(
    private theHotelRoom: TheHotelRoom
  ) { }

  execute(editBookingDto: EditBookingDto) {
    const booking = new Booking(editBookingDto.id, editBookingDto.personName, editBookingDto.dateStart, editBookingDto.dateEnd); 

    if (!this.theHotelRoom.calendar.existsBooking(booking)) {
      throw new BookingNotFoundError();
    }

    this.theHotelRoom.calendar.saveBooking(booking);
  }
}

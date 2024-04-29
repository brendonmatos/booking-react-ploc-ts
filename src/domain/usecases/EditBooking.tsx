import { BookingNotFoundError } from "../exceptions";
import { Booking } from "../entity/Booking";
import { EditBookingDto } from "./EditBookingDto";
import { ReservationsService } from "../services/ReservationsService";


export class EditBooking {
  constructor(
    private reservationService: ReservationsService,
  ) { }

  execute(editBookingDto: EditBookingDto) {
    const booking = new Booking(editBookingDto.id, editBookingDto.personName, editBookingDto.dateStart, editBookingDto.dateEnd); 

    if (!this.reservationService.findBookingById(booking.id)) {
      throw new BookingNotFoundError();
    }

    this.reservationService.saveBooking(booking);
  }
}

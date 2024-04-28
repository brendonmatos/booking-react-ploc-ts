import { InvalidDateError, DateOverlapError } from "../exceptions";
import { Booking } from "../entity/Booking";
import { TheHotelRoom } from "../entity/TheHotelRoom";
import { CreateBookingDto } from "./CreateBookingDto";
import { ReservationsService } from "../services/ReservationsService";


export class CreateBooking {
  constructor(
    private reservationsService: ReservationsService,
    private theHotelRoom: TheHotelRoom
  ) { }

  execute(createBookingDto: CreateBookingDto) {
    const booking = new Booking(this.reservationsService.getNextReservationCode(), createBookingDto.personName, createBookingDto.dateStart, createBookingDto.dateEnd);

    if (!this.theHotelRoom.calendar.verifyAvailabilityFor(booking)) {
      throw new DateOverlapError();
    }

    this.theHotelRoom.calendar.saveBooking(booking);
  }
}

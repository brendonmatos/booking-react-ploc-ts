import { Booking } from "../entity/Booking";
import { DateOverlapError } from "../exceptions";
import { ReservationsService } from "../services/ReservationsService";
import { SaveBookingDto } from "./SaveBookingDto";


export class CreateBooking {
  constructor(
    private reservationsService: ReservationsService,
  ) { }

  execute(saveBookingDto: SaveBookingDto) {
    const id = saveBookingDto.id || this.reservationsService.getNextReservationCode();
    const { dateStart, dateEnd, personName } = saveBookingDto;
    const b = new Booking(id, personName, dateStart, dateEnd);
    const conflicts = this.reservationsService.getBookingsConflicting(dateStart, dateEnd);
    const conflictsThatAreNotTheSameBooking = conflicts.filter(c => c.id !== b.id);    
    if (conflictsThatAreNotTheSameBooking.length > 0) {
      throw new DateOverlapError();
    }
    this.reservationsService.saveBooking(b);
  }
}

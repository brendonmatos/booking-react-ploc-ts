import { Booking } from "../entity/Booking";
import { DateOverlapError, PlaceNotFoundError } from "../exceptions";
import { PlacesService } from "../services/PlacesService";
import { ReservationsService } from "../services/ReservationsService";
import { SaveBookingDto } from "./SaveBookingDto";


export class CreateBooking {
  constructor(
    private reservationsService: ReservationsService,
    private placeService: PlacesService,
  ) { }

  execute(saveBookingDto: SaveBookingDto) {
    const place = this.placeService.getById(saveBookingDto.placeId)
    if (!place) {
      throw new PlaceNotFoundError();
    }
    const id = saveBookingDto.id || this.reservationsService.getNextReservationCode();
    const { dateStart, dateEnd, personName } = saveBookingDto;
    const b = new Booking(id, personName, dateStart, dateEnd, place);
    const conflicts = this.reservationsService.getBookingsConflicting(dateStart, dateEnd);
    const conflictsThatAreNotTheSameBooking = conflicts.filter(c => c.id !== b.id);    
    if (conflictsThatAreNotTheSameBooking.length > 0) {
      throw new DateOverlapError();
    }
    this.reservationsService.saveBooking(b);
  }
}

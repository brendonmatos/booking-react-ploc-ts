import { BookingNotFoundError, PlaceNotFoundError } from "../exceptions";
import { Booking } from "../entity/Booking";
import type { EditBookingDto } from "./EditBookingDto";
import type { ReservationsService } from "../services/ReservationsService";
import type { PlacesService } from "../services/PlacesService";

export class EditBooking {
	constructor(
		private reservationService: ReservationsService,
		private placeService: PlacesService,
	) {}

	execute(editBookingDto: EditBookingDto) {
		const place = this.placeService.getById(editBookingDto.placeId);

		if (!place) {
			throw new PlaceNotFoundError();
		}

		const booking = new Booking(
			editBookingDto.id,
			editBookingDto.personName,
			editBookingDto.dateStart,
			editBookingDto.dateEnd,
			place,
		);

		if (!this.reservationService.findBookingById(booking.id)) {
			throw new BookingNotFoundError();
		}

		this.reservationService.saveBooking(booking);
	}
}

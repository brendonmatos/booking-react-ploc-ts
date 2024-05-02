import type { Booking } from "../entity/Booking";
import { BookingNotFoundError } from "../exceptions";
import type { ReservationsService } from "../services/ReservationsService";

export class RemoveBooking {
	constructor(private reservationsService: ReservationsService) {}

	execute(booking: Booking) {
		if (!this.reservationsService.findBookingById(booking.id)) {
			throw new BookingNotFoundError();
		}

		this.reservationsService.removeBooking(booking.id);
	}
}

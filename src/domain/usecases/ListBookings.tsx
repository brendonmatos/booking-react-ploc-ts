import type { ReservationsService } from "../services/ReservationsService";

export class ListBookings {
	constructor(private reservationsService: ReservationsService) {}

	execute(placeId: string) {
		return this.reservationsService.listBookings(placeId);
	}
}

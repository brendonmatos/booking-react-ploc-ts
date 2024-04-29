import { ReservationsService } from "../services/ReservationsService";

export class ListBookings{
  constructor(
    private reservationsService: ReservationsService,
  ) { }

  execute() {
    return this.reservationsService.listBookings()
  }
}

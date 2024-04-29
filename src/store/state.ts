import { Booking } from "../domain/entity/Booking";
import { MemoryReservationsService } from "../infra/MemoryReservationsService";

export const reservationsService = new MemoryReservationsService()

reservationsService.saveBooking(new Booking(reservationsService.getNextReservationCode(), 'John Doe', new Date(2024, 4, 1), new Date(2024, 4, 5)))
reservationsService.saveBooking(new Booking(reservationsService.getNextReservationCode(), 'Peter Parker', new Date(2024, 4, 12), new Date(2024, 4, 15)))

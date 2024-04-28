import { Booking } from "./domain/entity/Booking";
import { TheHotelRoom } from "./domain/entity/TheHotelRoom";
import { ReservationsService } from "./domain/services/ReservationsService";

export const theHotelRoom = new TheHotelRoom();
export const reservationsService = new ReservationsService()

theHotelRoom.calendar.saveBooking(new Booking(reservationsService.getNextReservationCode(), 'John Doe', new Date(2024, 4, 1), new Date(2024, 4, 5)))
theHotelRoom.calendar.saveBooking(new Booking(reservationsService.getNextReservationCode(), 'Peter Parker', new Date(2024, 4, 12), new Date(2024, 4, 15)))

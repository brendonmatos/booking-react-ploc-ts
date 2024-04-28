export class ReservationsService {
  nextBookingId: number = 1;
  constructor() {}
  getNextReservationCode() {
    const date = new Date();
    const nextBookingId = this.nextBookingId++;
    return `R${date.getFullYear()}${date.getMonth().toString().padStart(2, '0')}${date.getDate()}-${nextBookingId.toString().padStart(4, '0')}`;
  }
}
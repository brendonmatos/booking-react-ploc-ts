import { Booking } from "./Booking";
export class Place {
  // name: string = "";
  // bookings: Booking[] = [];
  constructor(
    public id: string,
    public name: string,
    public bookings: Booking[] = [], 
    public image: string,
    public price: number,
  ) {}
}

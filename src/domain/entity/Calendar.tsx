import type { Booking } from "./Booking";
export class Place {
	constructor(
		public id: string,
		public name: string,
		public bookings: Booking[] = [],
		public image: string,
		public price: number,
	) {}
}

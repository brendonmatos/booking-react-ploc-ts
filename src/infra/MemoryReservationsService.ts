import type { Booking } from "@/domain/entity/Booking";
import type { ReservationsService } from "../domain/services/ReservationsService";
import { ReactiveValue } from "@/domain/entity/Observable";

export class MemoryReservationsService implements ReservationsService {
	nextBookingId = 1;
	bookings: Map<string, Booking> = new Map();
	reactiveBookings: ReactiveValue<Booking[]> = new ReactiveValue(
		[] as Booking[],
	);

	findBookingById(id: string): Booking | undefined {
		return this.bookings.get(id);
	}

	saveBooking(booking: Booking): void {
		this.bookings.set(booking.id, booking);
		this.reactiveBookings.set([...this.bookings.values()]);
	}

	removeBooking(id: string): void {
		this.bookings.delete(id);
		this.reactiveBookings.set([...this.bookings.values()]);
	}

	getBookingBeforeAndAfter(
		date: Date,
		exceptBookingId?: string,
	): { before: Booking | undefined; after: Booking | undefined } {
		const result: { before: Booking | undefined; after: Booking | undefined } =
			{ before: undefined, after: undefined };

		const bookings = Array.from(this.bookings.values())
			.filter((booking) => booking.id !== exceptBookingId)
			.sort((a, b) => a.dateStart.getTime() - b.dateStart.getTime());

		for (const booking of bookings) {
			if (booking.dateStart < date) {
				result.before = booking;
			} else if (booking.dateStart > date) {
				result.after = booking;
				break;
			}
		}

		return result;
	}

	getBookingsConflicting(
		dateStart: Date,
		dateEnd: Date,
		exceptBookingId: string,
	): Booking[] {
		const conflictingBookings: Booking[] = [];

		for (const [_, booking] of this.bookings) {
			if (booking.id === exceptBookingId) {
				continue;
			}

			const isStartBetween =
				booking.dateStart <= dateStart && booking.dateEnd >= dateStart;
			const isEndBetween =
				booking.dateStart <= dateEnd && booking.dateEnd >= dateEnd;

			if (isStartBetween || isEndBetween) {
				conflictingBookings.push(booking);
			}
		}

		return conflictingBookings;
	}

	getNextReservationCode() {
		const date = new Date();
		const nextBookingId = this.nextBookingId++;
		return `R${date.getFullYear()}${date
			.getMonth()
			.toString()
			.padStart(2, "0")}${date.getDate()}-${nextBookingId
			.toString()
			.padStart(4, "0")}`;
	}

	listBookings(placeId: string): ReactiveValue<Booking[]> {
		const reactiveFiltered = new ReactiveValue(
			[...this.bookings.values()].filter(
				(booking) => booking.place.id === placeId,
			),
		);
		this.reactiveBookings.subscribe((list) => {
			const filtered = list.filter((booking) => booking.place.id === placeId);
			reactiveFiltered.set(filtered);
		});
		return reactiveFiltered;
	}
}

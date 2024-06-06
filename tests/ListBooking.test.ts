import { test, expect, describe, vi } from "vitest";
import { MemoryReservationsService } from "../src/infra/MemoryReservationsService";
import { ListBookings } from "../src/domain/usecases/ListBookings";
import { Place } from "../src/domain/entity/Calendar";
import { helpCreateBookings } from "./_utils";

describe("ListBookings reactive usecase", () => {
	test("should list bookings", () => {
		const reservationService = new MemoryReservationsService();
		helpCreateBookings(reservationService, [
			{ start: new Date("2024-05-01"), end: new Date("2024-05-02") },
			{ start: new Date("2024-05-05"), end: new Date("2024-05-06") },
		]);

		const listBookings = new ListBookings(reservationService);

		const bookingsReative = listBookings.execute("1");

		expect(bookingsReative.get()).toEqual([
			expect.objectContaining({
				dateStart: new Date("2024-05-01"),
				dateEnd: new Date("2024-05-02"),
				personName: "HeyMan",
			}),
			expect.objectContaining({
				dateStart: new Date("2024-05-05"),
				dateEnd: new Date("2024-05-06"),
				personName: "HeyMan",
			}),
		]);

		const fn = vi.fn();

		bookingsReative.subscribe(fn);

		reservationService.saveBooking({
			dateStart: new Date("2024-05-07"),
			dateEnd: new Date("2024-05-08"),
			personName: "HeyMan",
			id: "3",
			place: new Place(
				"1",
				"Place 1",
				[],
				"https://via.placeholder.com/150",
				200,
			),
		});

		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith([
			expect.objectContaining({
				dateStart: new Date("2024-05-01"),
				dateEnd: new Date("2024-05-02"),
				personName: "HeyMan",
			}),
			expect.objectContaining({
				dateStart: new Date("2024-05-05"),
				dateEnd: new Date("2024-05-06"),
				personName: "HeyMan",
			}),
			expect.objectContaining({
				dateStart: new Date("2024-05-07"),
				dateEnd: new Date("2024-05-08"),
				personName: "HeyMan",
			}),
		]);
	});
});

import { DateOverlapError } from "../src/domain/exceptions";
import { test, expect } from "vitest";
import { MemoryReservationsService } from "../src/infra/MemoryReservationsService";
import { CreateBooking } from "../src/domain/usecases/CreateBooking";
import { MemoryPlacesService } from "../src/infra/MemoryPlacesService";
import { Place } from "../src/domain/entity/Calendar";

// TODO: mock the DATE!!!!!

test("should edit booking without overlaping with itself", () => {
	const reservationService = new MemoryReservationsService();
	const placesService = new MemoryPlacesService([
		new Place("1", "Place 1", [], "https://via.placeholder.com/150", 200),
	]);
	const saveBooking = new CreateBooking(reservationService, placesService);
	saveBooking.execute({
		dateStart: new Date("2024-01-01"),
		dateEnd: new Date("2024-01-02"),
		personName: "HeyMan",
		id: "1",
		placeId: "1",
	});
	saveBooking.execute({
		dateStart: new Date("2024-01-03"),
		dateEnd: new Date("2024-01-04"),
		personName: "HeyMan",
		id: "1",
		placeId: "1",
	});
	expect(reservationService.listBookings("1").get()).toEqual([
		expect.objectContaining({
			id: "1",
			dateStart: new Date("2024-01-03"),
			dateEnd: new Date("2024-01-04"),
			personName: "HeyMan",
		}),
	]);
});

test("should save booking when there is no conflict", () => {
	const reservationService = new MemoryReservationsService();
	const placesService = new MemoryPlacesService([
		new Place("1", "Place 1", [], "https://via.placeholder.com/150", 200),
	]);
	const saveBooking = new CreateBooking(reservationService, placesService);
	saveBooking.execute({
		dateStart: new Date("2024-01-01"),
		dateEnd: new Date("2024-01-02"),
		personName: "HeyMan",
		id: "1",
		placeId: "1",
	});
	saveBooking.execute({
		dateStart: new Date("2024-01-03"),
		dateEnd: new Date("2024-01-04"),
		personName: "HeyMan",
		id: "2",
		placeId: "1",
	});

	expect(reservationService.listBookings("1").get()).toEqual([
		expect.objectContaining({
			id: "1",
			dateStart: new Date("2024-01-01"),
			dateEnd: new Date("2024-01-02"),
			personName: "HeyMan",
		}),
		expect.objectContaining({
			id: "2",
			dateStart: new Date("2024-01-03"),
			dateEnd: new Date("2024-01-04"),
			personName: "HeyMan",
		}),
	]);
});

test("should not save booking when there is conflict", () => {
	const reservationService = new MemoryReservationsService();
	const placesService = new MemoryPlacesService([
		new Place("1", "Place 1", [], "https://via.placeholder.com/150", 200),
	]);
	const saveBooking = new CreateBooking(reservationService, placesService);
	saveBooking.execute({
		dateStart: new Date("2024-01-01"),
		dateEnd: new Date("2024-01-02"),
		personName: "HeyMan",
		id: "1",
		placeId: "1",
	});
	expect(() =>
		saveBooking.execute({
			dateStart: new Date("2024-01-02"),
			dateEnd: new Date("2024-01-03"),
			personName: "HeyMan",
			id: "2",
			placeId: "1",
		}),
	).toThrow(new DateOverlapError());
});

test("should remove booking", () => {
	const reservationService = new MemoryReservationsService();
	const placesService = new MemoryPlacesService([
		new Place("1", "Place 1", [], "https://via.placeholder.com/150", 200),
	]);
	const saveBooking = new CreateBooking(reservationService, placesService);
	saveBooking.execute({
		dateStart: new Date("2024-01-01"),
		dateEnd: new Date("2024-01-02"),
		personName: "HeyMan",
		id: "1",
		placeId: "1",
	});
	saveBooking.execute({
		dateStart: new Date("2024-01-03"),
		dateEnd: new Date("2024-01-04"),
		personName: "HeyMan",
		id: "2",
		placeId: "1",
	});
	reservationService.removeBooking("1");
});

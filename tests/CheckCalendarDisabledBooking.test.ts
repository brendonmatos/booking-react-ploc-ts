import { test, describe } from "vitest";
import { MemoryReservationsService } from "../src/infra/MemoryReservationsService";
import { CheckCalendarDisableBooking } from "../src/domain/usecases/CheckCalendarDisableBooking";
import { helpCheckDisabled, helpCreateBookings } from "./_utils";

describe("CheckCalendarDisableBooking usecase", () => {
	test("should return if a date is disallowed", () => {
		const reservationService = new MemoryReservationsService();

		helpCreateBookings(reservationService, [
			{ start: new Date("2024-05-01"), end: new Date("2024-05-02") },
			{ start: new Date("2024-05-05"), end: new Date("2024-05-06") },
		]);

		const checkCalendarDisableBooking = new CheckCalendarDisableBooking(
			reservationService,
		);

		// Calendar
		// 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09
		//  o      o       x       x       o       o       x       x       x

		helpCheckDisabled(checkCalendarDisableBooking, {
			"2024-05-01": true,
			"2024-05-02": true,
			"2024-05-03": false,
			"2024-05-04": false,
			"2024-05-05": true,
			"2024-05-06": true,
			"2024-05-07": false,
			"2024-05-08": false,
			"2024-05-09": false,
		});

		// Calendar
		// 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09
		//  x      x       ->      o       x       x       x       x       x

		helpCheckDisabled(
			checkCalendarDisableBooking,
			{
				"2024-05-01": true,
				"2024-05-02": true,
				"2024-05-03": false,
				"2024-05-04": false,
				"2024-05-05": true,
				"2024-05-06": true,
				"2024-05-07": true,
				"2024-05-08": true,
				"2024-05-09": true,
			},
			new Date("2024-05-03"),
		);

		// Calendar
		// 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09 - 05/10
		//  x      x       x       x       x       x       o       o       o       ->

		helpCheckDisabled(
			checkCalendarDisableBooking,
			{
				"2024-05-01": true,
				"2024-05-02": true,
				"2024-05-03": true,
				"2024-05-04": true,
				"2024-05-05": true,
				"2024-05-06": true,
				"2024-05-07": false,
				"2024-05-08": false,
				"2024-05-09": false,
			},
			new Date("2024-05-10"),
		);
	});
});

import { MemoryPlacesService } from "@/infra/MemoryPlacesService";
import { Booking } from "../domain/entity/Booking";
import { MemoryReservationsService } from "../infra/MemoryReservationsService";
import { Place } from "@/domain/entity/Calendar";

import mansao from "@/assets/7d96eb75-348b-481e-9830-f07515b3338b.jpeg.webp";
import casaCampo from "@/assets/98b93523-167a-404f-9716-2d66a3c0f85d.jpeg.webp";
import tinyChale from "@/assets/34404d83-5b7e-40f6-91a7-ef1d2e2fcb4c.jpeg.webp";
import unitedState from "@/assets/87428762.webp";
import triangular from "@/assets/d1882da8-333c-4ddd-ad8b-66c7f5801971.jpg.webp";

const placeMansao = new Place(
	"1-big-house",
	"Big house in the middle of nowhere",
	[],
	mansao,
	53300,
);
const placeCasaCampo = new Place(
	"2-campside-house",
	"Campside in the middle of the forest",
	[],
	casaCampo,
	6540,
);
const placeTinyChale = new Place(
	"3-chale",
	"Charming little chalet",
	[],
	tinyChale,
	3200,
);
const placeUnitedState = new Place(
	"4-new-york-studio",
	"New York City studio",
	[],
	unitedState,
	900,
);
const placeTriangular = new Place(
	"5-triangular",
	"Triangular house",
	[],
	triangular,
	2370,
);

export const placesService = new MemoryPlacesService([
	placeMansao,
	placeCasaCampo,
	placeTinyChale,
	placeUnitedState,
	placeTriangular,
]);

export const reservationsService = new MemoryReservationsService();
reservationsService.saveBooking(
	new Booking(
		reservationsService.getNextReservationCode(),
		"John Doe",
		new Date(2024, 4, 1),
		new Date(2024, 4, 5),
		placeMansao,
	),
);
reservationsService.saveBooking(
	new Booking(
		reservationsService.getNextReservationCode(),
		"Peter Parker",
		new Date(2024, 4, 12),
		new Date(2024, 4, 15),
		placeMansao,
	),
);

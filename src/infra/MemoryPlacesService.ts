import type { PlacesService } from "@/domain/services/PlacesService";
import type { Place } from "@/domain/entity/Calendar";
import { ReactiveValue } from "@/domain/entity/Observable";

export class MemoryPlacesService implements PlacesService {
	constructor(private places: Place[] = []) {}

	getById(id: string): Place {
		const place = this.places.find((place) => place.id === id);
		if (!place) {
			throw new Error("Place not found.");
		}

		return place;
	}

	list(): Place[] {
		return this.places;
	}
}

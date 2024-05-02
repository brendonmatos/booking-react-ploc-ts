import type { PlacesService } from "../services/PlacesService";

export class GetPlaceDetail {
	constructor(private placesService: PlacesService) {}

	execute({ id }: { id: string }) {
		return this.placesService.getById(id);
	}
}

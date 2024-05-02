import { PlacesService } from "../services/PlacesService";

export class ListPlaces {
  constructor(
    private placesService: PlacesService,
  ) { }

  execute() {
    return this.placesService.list()
  }
}

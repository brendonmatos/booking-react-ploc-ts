import { Place } from "../entity/Calendar";

export interface PlacesService {
  getById(id: string): Place;
  list(): Place[]
}



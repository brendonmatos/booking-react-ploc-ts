import { InvalidDateError } from "../exceptions";
import { Place } from "./Calendar";

export class Booking {
  constructor(
    public id: string,
    public personName: string,
    public dateStart: Date,
    public dateEnd: Date,
    public place: Place,
  ) { 


    if (dateStart > dateEnd) {
      throw new InvalidDateError();
    }
  }
}

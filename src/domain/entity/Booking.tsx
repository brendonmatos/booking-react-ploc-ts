import { InvalidDateError } from "../exceptions";

export class Booking {
  constructor(
    public id: string,
    public personName: string,
    public dateStart: Date,
    public dateEnd: Date
  ) { 


    if (dateStart > dateEnd) {
      throw new InvalidDateError();
    }
  }
}

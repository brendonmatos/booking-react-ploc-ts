export type CreateBookingDto = {
	personName: string;
	dateStart: Date;
	dateEnd: Date;
	id?: string;
	placeId: string;
};

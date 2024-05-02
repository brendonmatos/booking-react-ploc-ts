export class DomainError extends Error {
	static is(error: Error): error is DomainError {
		return error instanceof DomainError;
	}
}

export class DateOverlapError extends DomainError {
	constructor() {
		super(
			"Date overlap error. The booking dates overlap with an existing booking.",
		);
	}
}

export class InvalidDateError extends DomainError {
	constructor() {
		super("Invalid date error. The booking dates are invalid.");
	}
}

export class BookingNotFoundError extends DomainError {
	constructor() {
		super("Booking not found error. The booking does not exist.");
	}
}

export class PlaceNotFoundError extends DomainError {
	constructor() {
		super("Place not found error. The place does not exist.");
	}
}

import { DialogFormBookingViewProvider } from "@/context/booking-dialog";
import { useSyncExternalStore } from "react";
import { BookingsList } from "../components/bookings-list";
import { PlaceCardContent } from "../components/place-card-content";
import { useLoaderData } from "react-router-dom";
import { GetPlaceDetail } from "@/domain/usecases/GetPlaceDetail";
import { placesService, reservationsService } from "@/store/state";
import { ListBookings } from "@/domain/usecases/ListBookings";
import { CreateBookingButton } from "../components/create-booking-button";
import { EmptyState } from "@/components/empty-state";

export function BookingsManagement() {
	const { place, bookingsReactive } = useLoaderData() as ReturnType<
		typeof bookingsManagementLoader
	>;

	const bookings = useSyncExternalStore(
		function subscribe(onStoreChange) {
			const { unregister } = bookingsReactive.subscribe(() => {
				onStoreChange();
			});
			return unregister;
		},
		function getSnapshot() {
			return bookingsReactive.get();
		},
	);

	const isBookingsEmpty = bookings.length === 0;

	return (
		<DialogFormBookingViewProvider place={place}>
			<PlaceCardContent place={place} orientation="horizontal">
				<CreateBookingButton />
			</PlaceCardContent>
			<div className="mt-8">
				{(isBookingsEmpty && (
					<EmptyState
						title="No bookings yet"
						description="Create a new booking to get started"
					>
						<CreateBookingButton />
					</EmptyState>
				)) || <BookingsList items={bookings} />}
			</div>
		</DialogFormBookingViewProvider>
	);
}

export function bookingsManagementLoader({ params }: { params: any }) {
	const placeDetail = new GetPlaceDetail(placesService);

	if (!params.placeId) {
		throw new Error("Place id is required");
	}

	const place = placeDetail.execute({ id: params.placeId });
	const bookingsList = new ListBookings(reservationsService);
	const reactiveList = bookingsList.execute(place.id);
	return {
		place,
		bookingsReactive: reactiveList,
	};
}

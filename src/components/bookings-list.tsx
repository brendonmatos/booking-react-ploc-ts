import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Fragment } from "react";
import { BookingItem } from "./booking-item";
import { useDialogFormBooking } from "@/context/booking-dialog";
import type { Booking } from "@/domain/entity/Booking";

export type BookingsListProps = {
	items: Booking[];
};

export function BookingsList({ items }: BookingsListProps) {
	const { openCreateBooking, openEditBooking } = useDialogFormBooking();

	return (
		<div className="flex flex-col pt-0">
			{items.map((item) => (
				<Fragment key={item.id}>
					<BookingItem booking={item} onClick={() => openEditBooking(item)} />
					<div className="h-3 opacity-0 hover:opacity-100 flex transition-all duration-400 relative">
						<Button
							variant="outline"
							className="rounded-full absolute -top-3"
							onClick={openCreateBooking}
						>
							<PlusIcon />
						</Button>
					</div>
				</Fragment>
			))}
		</div>
	);
}

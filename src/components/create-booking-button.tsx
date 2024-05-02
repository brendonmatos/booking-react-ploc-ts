import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useDialogFormBooking } from "@/context/booking-dialog";

export function CreateBookingButton() {
	const { openCreateBooking } = useDialogFormBooking();
	return (
		<Button className="mt-4" onClick={openCreateBooking}>
			Create booking <PlusIcon className="w-4 h-4" />
		</Button>
	);
}

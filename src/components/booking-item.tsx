import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { cn } from "../lib/utils";
import { formatDateToHuman } from "../lib/formatDateToHuman";
import type { Booking } from "../domain/entity/Booking";
import { Button } from "./ui/button";
import { TrashIcon, MoreVerticalIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import { RemoveBooking } from "../domain/usecases/RemoveBooking";
import { useToast } from "./ui/use-toast";
import { reservationsService } from "../store/state";
import type { MouseEventHandler } from "react";

const handleAndDoNothing: MouseEventHandler<any> = (event) => {
	event.stopPropagation();
};

export function BookingItem({
	booking,
	onClick,
}: { booking: Booking; onClick?: () => void }) {
	const { toast } = useToast();

	const handleDelete: MouseEventHandler<any> = (event) => {
		handleAndDoNothing(event);
		const removeBooking = new RemoveBooking(reservationsService);
		removeBooking.execute(booking);
		toast({
			title: "Booking deleted",
			description: `Booking #${booking.id} has been deleted`,
		});
	};

	return (
		<button
			type="button"
			className={cn(
				"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
			)}
			onClick={onClick}
		>
			<div className="flex w-full flex-col gap-1">
				<div className="flex items-center">
					<div className="flex items-center gap-2">
						<div className="font-semibold space-x-2">
							<span className="font-mono border py-1 px-2 rounded dark:bg-slate-900">
								#{booking.id}
							</span>
							<span>{booking.personName}</span>
						</div>
					</div>
					<div className={cn("ml-auto text-xs", "text-muted-foreground")}>
						{formatDistanceToNow(new Date(booking.dateStart), {
							addSuffix: true,
						})}
					</div>
				</div>
				<div className="flex justify-between">
					<div className="text-xs font-medium flex items-center gap-1">
						{formatDateToHuman(booking.dateStart)}
						<ArrowRightIcon className="w-4 h-4" />
						{formatDateToHuman(booking.dateEnd)}
					</div>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<MoreVerticalIcon className="h-4 w-4" />
								<span className="sr-only">More</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<DropdownMenuItem>
										<TrashIcon className="h-4 w-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={handleDelete}>
										Confirm
									</DropdownMenuItem>
									<DropdownMenuItem onClick={handleAndDoNothing}>
										Cancel
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</button>
	);
}

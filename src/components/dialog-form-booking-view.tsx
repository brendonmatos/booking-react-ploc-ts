import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar as CalendarInput } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditBooking } from "@/domain/usecases/EditBooking";
import { CreateBooking } from "@/domain/usecases/CreateBooking";
import { useToast } from "@/components/ui/use-toast";
import { CheckCalendarDisableBooking } from "@/domain/usecases/CheckCalendarDisableBooking";
import { useDialogFormBooking } from "@/context/booking-dialog";
import { placesService, reservationsService } from "@/store/state";

const editBooking = new EditBooking(reservationsService, placesService);
const createBooking = new CreateBooking(reservationsService, placesService);
const checkCalendarDisableBooking = new CheckCalendarDisableBooking(
	reservationsService,
);

export const formSchema = z.object({
	personName: z.string().min(2),
	range: z
		.object({
			from: z.date(),
			to: z.date(),
		})
		.refine(({ from, to }) => from < to, {
			message: "The end date must be after the start date",
			path: ["range"],
		}),
});

export function DialogFormBookingView() {
	const { toast } = useToast();
	const { dialog, closeDialog } = useDialogFormBooking();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			personName: dialog.booking?.personName ?? "",
			range: {
				from: dialog.booking?.dateStart,
				to: dialog.booking?.dateEnd,
			},
		},
	});

	const onSubmit = () => {
		const bookingData = {
			personName: form.getValues("personName"),
			dateStart: form.getValues("range").from,
			dateEnd: form.getValues("range").to,
			placeId: dialog.place!.id,
		};

		if (dialog.booking) {
			editBooking.execute({
				id: dialog.booking.id,
				...bookingData,
			});
		} else {
			createBooking.execute(bookingData);
		}

		handleOnOpenChange(false);

		if (dialog.booking) {
			toast({
				title: "Booking saved",
				description: "The booking was successfully saved",
			});
		} else {
			toast({
				title: "Booking created",
				description: "The booking was successfully created",
			});
		}
	};

	const handleOnOpenChange = (open: boolean) => {
		if (!open) {
			closeDialog();
			form.reset();
		}
	};

	const handleCheckDateIsEnabled = (date: Date) => {
		return checkCalendarDisableBooking.execute({
			checkDate: date,
			startBookingDate: form.getValues("range").from,
			bookingId: dialog.booking?.id,
		});
	};

	return (
		<Dialog open={dialog.open} onOpenChange={handleOnOpenChange}>
			<DialogContent className="w-full md:w-fit  overflow-y-auto max-h-screen">
				<DialogHeader>
					<DialogTitle>
						{dialog.booking ? "Edit booking" : "Create booking"}
					</DialogTitle>
					<DialogDescription>
						{dialog.booking
							? "Edit the booking details"
							: "Fill in the form to create a new booking"}
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="grid w-full items-center gap-4">
							<FormField
								control={form.control}
								name="personName"
								render={({ field }) => (
									<FormItem>
										<Label htmlFor="personName">Guest name</Label>
										<FormControl>
											<Input
												id="personName"
												placeholder="John Doe"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="range"
							render={({ field }) => (
								<FormItem>
									<div className="flex justify-between">
										<div>
											<FormLabel>Choose the period</FormLabel>
											<FormDescription>
												Select the start and end date for the booking.
											</FormDescription>
										</div>
										<Button
											type="button"
											variant="outline"
											onClick={() => field.onChange([null, null])}
										>
											Reset
										</Button>
									</div>
									<FormControl>
										<CalendarInput
											initialFocus
											mode="range"
											defaultMonth={field.value.from}
											selected={field.value}
											onSelect={field.onChange}
											numberOfMonths={2}
											checkDisabled={handleCheckDateIsEnabled}
										/>
									</FormControl>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">Save</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

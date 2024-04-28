import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDays } from "date-fns";
import { Calendar as CalendarInput } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Booking } from "./domain/entity/Booking";
import { EditBooking } from "./domain/usecases/EditBooking";
import { CreateBooking } from "./domain/usecases/CreateBooking";
import { reservationsService, theHotelRoom } from "./state";
import { useToast } from "./components/ui/use-toast";


export const formSchema = z.object({
  personName: z.string().min(2),
  range: z.object({
    from: z.date(),
    to: z.date(),
  }).refine(({ from, to }) => from < to, {
    message: 'The end date must be after the start date',
    path: ['range'],
  }),
})


export function DialogFormBookingView({ open, booking, onSetOpenState }: { open: boolean; onSetOpenState: (open: boolean) => void; booking?: Booking; }) {

  const { toast } = useToast()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personName: booking?.personName ?? '',
      range: {
        from: booking?.dateStart,
        to: booking?.dateEnd,
      },
    },
  });

  const onSubmit = () => {
    if (booking) {
      const editBooking = new EditBooking(theHotelRoom);
      editBooking.execute({
        id: booking.id,
        personName: form.getValues('personName'),
        dateStart: form.getValues('range').from,
        dateEnd: form.getValues('range').to,
      });
      onSetOpenState(false)
      toast({
        title: 'Booking saved',
        description: 'The booking was successfully saved',
      })
      return;
    }

    const createBooking = new CreateBooking(reservationsService, theHotelRoom);
    createBooking.execute({
      personName: form.getValues('personName'),
      dateStart: form.getValues('range').from,
      dateEnd: form.getValues('range').to,
    });
    onSetOpenState(false)
    toast({
      title: 'Booking created',
      description: 'The booking was successfully created',
    })
  };

  const handleOnOpenChange = (open: boolean) => {
    onSetOpenState(open);
    form.reset();
  }

  return <Dialog open={open} onOpenChange={handleOnOpenChange}>
    <DialogContent className="w-full md:w-fit  overflow-y-auto max-h-screen">
      <DialogHeader>
        <DialogTitle>
          {booking ? 'Edit booking' : 'Create booking'}
        </DialogTitle>
        <DialogDescription>
          {booking ? 'Edit the booking details' : 'Fill in the form to create a new booking'}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full items-center gap-4">
            <FormField control={form.control} name="personName" render={({ field }) => (
              <FormItem>
                <Label htmlFor="personName">Guest name</Label>
                <FormControl>
                  <Input id="personName" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField
            control={form.control}
            name="range"
            render={({ field }) => (
              <FormItem>

                <div className="flex justify-between">
                  <div>
                  <FormLabel>
                    Choose the period
                  </FormLabel>
                  <FormDescription>
                    Select the start and end date for the booking.
                  </FormDescription>
                </div>

                <Button type="button" variant="outline" onClick={() => field.onChange([null, null])}>Reset</Button>
                </div>
                <FormControl>
                  <CalendarInput
                    initialFocus
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    checkDisabled={(date) => {
                      const isAfterToday = date > addDays(new Date(), 1);
                      const tempBooking = new Booking('temp', form.getValues('personName'), date, date);
                      const isDayFree = theHotelRoom.calendar.verifyAvailabilityFor(tempBooking);
                      const isAfterAnyBooking = theHotelRoom.calendar.dateIsAfterAnyBookingAfterDate(date, field.value.from);
                      const isBeforeAnyBooking = theHotelRoom.calendar.dateIsBeforeAnyBookingBeforeDate(date, field.value.from);

                      const isSelectedFirstDate = Boolean(field.value.from);

                      return !isDayFree || !isAfterToday || (isSelectedFirstDate && (
                        isAfterAnyBooking || isBeforeAnyBooking
                      ));
                    }} />
                </FormControl>
              </FormItem>
            )} />
          
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>;
}
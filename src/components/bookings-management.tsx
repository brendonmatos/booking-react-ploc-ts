import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useDialogFormBooking } from "@/context/booking-dialog";
import { useSyncExternalStore } from "react";
import { ListBookings } from "@/domain/usecases/ListBookings";
import { reservationsService } from "@/store/state";
import { BookingsList } from "./bookings-list";

const bookingsList = new ListBookings(reservationsService)
const reactiveList = bookingsList.execute();

export function BookingsManagement() {
  const { openCreateBooking } = useDialogFormBooking();
  const bookings = useSyncExternalStore(function subscribe(onStoreChange) {
    const {unregister} = reactiveList.subscribe(() => {
      onStoreChange()
    })
    return unregister;
  }, function getSnapshot() {
    return reactiveList.get()
  })
  return (<>
    <div className="py-2 justify-end flex">
      <Button onClick={openCreateBooking}>Create booking <PlusIcon className="w-4 h-4" /></Button>
    </div>
    <BookingsList items={bookings} />
  </>);
}

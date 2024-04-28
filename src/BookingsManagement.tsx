import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useDialogFormBooking } from "./DialogFormBookingContext";
import { ListBookings } from "./ListBookings";
import { theHotelRoom } from "./state";
import { useSyncExternalStore } from "react";


export function BookingsManagement() {
  const { openCreateBooking } = useDialogFormBooking();
  const bookings = useSyncExternalStore(function subscribe(onStoreChange) {
    const {unregister} = theHotelRoom.calendar.register(() => {
      onStoreChange()
    })
    return unregister;
  }, function getSnapshot() {
    return theHotelRoom.calendar.bookings;
  })
  return (<>
    <div className="py-2 justify-end flex">
      <Button onClick={openCreateBooking}>Create booking <PlusIcon className="w-4 h-4" /></Button>
    </div>
    <ListBookings items={bookings} />
  </>);
}

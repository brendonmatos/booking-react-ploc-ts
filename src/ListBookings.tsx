import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon } from "lucide-react";
import { Fragment } from "react";
import { BookingItem } from "./BookingItem";
import { ListBookingsProps, useDialogFormBooking } from "./DialogFormBookingContext";

export function ListBookings({ items }: ListBookingsProps) {

  const { openCreateBooking, openEditBooking } = useDialogFormBooking();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col pt-0">
        {items.map((item) => (<Fragment key={item.id}>
          <BookingItem booking={item} onClick={() => openEditBooking(item)} />
          <div className="h-3 opacity-0 hover:opacity-100 flex transition-all duration-400 relative">
            <Button variant="outline" className="rounded-full absolute -top-3" onClick={openCreateBooking}>
              <PlusIcon />
            </Button>
          </div>
        </Fragment>))}
      </div>
    </ScrollArea>
  );
}

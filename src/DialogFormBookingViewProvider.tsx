import { useState } from "react";
import { DialogFormBookingContext } from "./DialogFormBookingContext";
import { Booking } from "./domain/entity/Booking";
import { DialogFormBookingView } from "./DialogFormBookingView";

export function DialogFormBookingViewProvider({ children }: { children: React.ReactNode; }) {
  const [open, setOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | undefined>(undefined);

  const openEditBooking = (booking: Booking) => {
    setBooking(booking);
    setOpen(true);
  };

  const openCreateBooking = () => {
    setBooking(undefined);
    setOpen(true);
  };

  return (
    <DialogFormBookingContext.Provider value={{ openEditBooking, openCreateBooking }}>
      <DialogFormBookingView open={open} booking={booking} onSetOpenState={setOpen} key={booking?.id} />
      {children}
    </DialogFormBookingContext.Provider>
  );
}

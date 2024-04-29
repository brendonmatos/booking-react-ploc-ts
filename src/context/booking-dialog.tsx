import React, {useState, createContext} from "react";
import { Booking } from "../domain/entity/Booking";
import { DialogFormBookingView } from "@/components/dialog-form-booking-view"

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

export const DialogFormBookingContext = createContext<{
  openEditBooking: (booking: Booking) => void;
  openCreateBooking: () => void;
} | null>(null);

export type BookingsListProps = {
  items: Booking[];
};

export function useDialogFormBooking() {
  const context = React.useContext(DialogFormBookingContext);
  if (!context) {
    throw new Error('useDialogFormBooking must be used within a DialogFormBookingProvider');
  }
  return context;
}

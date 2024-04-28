import { createContext } from "react";
import React from "react";
import { Booking } from "./domain/entity/Booking";


export const DialogFormBookingContext = createContext<{
  openEditBooking: (booking: Booking) => void;
  openCreateBooking: () => void;
} | null>(null);

export type ListBookingsProps = {
  items: Booking[];
};

export function useDialogFormBooking() {
  const context = React.useContext(DialogFormBookingContext);
  if (!context) {
    throw new Error('useDialogFormBooking must be used within a DialogFormBookingProvider');
  }
  return context;
}

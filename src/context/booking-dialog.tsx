import React, {useState, createContext} from "react";
import { Booking } from "../domain/entity/Booking";
import { DialogFormBookingView } from "@/components/dialog-form-booking-view"
import { Place } from "@/domain/entity/Calendar";


export function useBookingDialogState(place: Place) {
  const [dialog, setDialog] = useState<{
    open: boolean;
    booking: Booking | undefined;
    place: Place | undefined;
  }>({ open: false, booking: undefined, place: undefined });

  const openEditBooking = (booking: Booking) => {
    setDialog({ open: true, booking, place });
  };

  const openCreateBooking = () => {
    setDialog({ open: true, booking: undefined, place });
  };

  const closeDialog = () => {
    setDialog({ open: false, booking: undefined, place });
  }

  return { dialog, openEditBooking, openCreateBooking, closeDialog };

}

export function useDialogFormBooking() {
  const context = React.useContext(DialogFormBookingContext);
  if (!context) {
    throw new Error('useDialogFormBooking must be used within a DialogFormBookingProvider');
  }
  return context;
}


export function DialogFormBookingViewProvider({ children, place }: { children: React.ReactNode, place: Place }) {

  const dialogState = useBookingDialogState(place);

  return (
    <DialogFormBookingContext.Provider value={dialogState}>
      <DialogFormBookingView key={dialogState.dialog.booking?.id} />
      {children}
    </DialogFormBookingContext.Provider>
  );
}

export const DialogFormBookingContext = createContext<ReturnType<typeof useBookingDialogState> | undefined>(undefined);

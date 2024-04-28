import Layout from "./layout";
import { BookingsManagement } from "./BookingsManagement";
import { DialogFormBookingViewProvider } from "./DialogFormBookingViewProvider";
import { Toaster } from "@/components/ui/toaster"

export function App() {
  return (
    <Layout>
      <DialogFormBookingViewProvider>
        <BookingsManagement />
      </DialogFormBookingViewProvider>
      <Toaster />
    </Layout>
  );
}

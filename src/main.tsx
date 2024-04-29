import React from 'react'
import ReactDOM from 'react-dom/client'
import '../app/globals.css'
import Layout from './components/layout'
import { DialogFormBookingViewProvider } from '@/context/booking-dialog'
import { BookingsManagement } from '@/components/bookings-management'
import { Toaster } from '@/components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout>
      <DialogFormBookingViewProvider>
        <BookingsManagement />
      </DialogFormBookingViewProvider>
      <Toaster />
    </Layout>
  </React.StrictMode>,
)

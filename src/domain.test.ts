import { DateOverlapError } from "./domain/exceptions"
import { Booking } from "./domain/entity/Booking"
import { Calendar } from "./domain/entity/Calendar"
import { test, expect } from 'vitest'

test('should save booking when there is no conflict', () => {
  const calendar = new Calendar()
  const booking1 = new Booking('1', 'HeyMan', new Date('2024-01-01'), new Date('2024-01-02'))
  const booking2 = new Booking('2', 'HeyMan', new Date('2024-01-03'), new Date('2024-01-04'))
  calendar.saveBooking(booking1)
  calendar.saveBooking(booking2)
  expect(calendar.bookings).toEqual([booking1, booking2])
})

test('should not save booking when there is conflict', () => {
  const calendar = new Calendar()
  const booking1 = new Booking('1', 'HeyMan', new Date('2024-01-01'), new Date('2024-01-02'))
  const booking2 = new Booking('2', 'HeyMan', new Date('2024-01-02'), new Date('2024-01-03'))
  calendar.saveBooking(booking1)
  expect(() => calendar.saveBooking(booking2)).toThrow(new DateOverlapError())
})

test('should remove booking', () => {
  const calendar = new Calendar()
  const booking1 = new Booking('1', 'HeyMan', new Date('2024-01-01'), new Date('2024-01-02'))
  const booking2 = new Booking('2', 'HeyMan', new Date('2024-01-03'), new Date('2024-01-04'))
  calendar.saveBooking(booking1)
  calendar.saveBooking(booking2)
  calendar.removeBooking(booking1)
  expect(calendar.bookings).toEqual([booking2])
})

test('should edit booking without overlaping with itself', () => {
  const calendar = new Calendar()
  const booking1 = new Booking('1', 'HeyMan', new Date('2024-01-01'), new Date('2024-01-02'))
  const booking2 = new Booking('1', 'HeyMan', new Date('2024-01-03'), new Date('2024-01-04'))
  calendar.saveBooking(booking1)
  calendar.saveBooking(booking2)
  expect(calendar.bookings).toEqual([booking2])
})


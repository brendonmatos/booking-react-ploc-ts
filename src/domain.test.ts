import { DateOverlapError } from "./domain/exceptions"
import { test, expect, describe, vi } from 'vitest'
import { MemoryReservationsService } from "./infra/MemoryReservationsService"
import { CreateBooking } from "./domain/usecases/SaveBooking"
import { CheckCalendarDisableBooking } from "./domain/usecases/CheckCalendarDisableBooking"
import { ReservationsService } from "./domain/services/ReservationsService"
import { ListBookings } from "./domain/usecases/ListBookings"
import { MemoryPlacesService } from "./infra/MemoryPlacesService"
import { Place } from "./domain/entity/Calendar"

// TODO: mock the DATE!!!!!

test('should edit booking without overlaping with itself', () => {
  const reservationService = new MemoryReservationsService()
  const placesService = new MemoryPlacesService([
    new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
  ])
  const saveBooking = new CreateBooking(reservationService, placesService)
  saveBooking.execute({
    dateStart: new Date('2024-01-01'),
    dateEnd: new Date('2024-01-02'),
    personName: 'HeyMan',
    id: '1',
    placeId: '1'
  })
  saveBooking.execute({
    dateStart: new Date('2024-01-03'),
    dateEnd: new Date('2024-01-04'),
    personName: 'HeyMan',
    id: '1',
    placeId: '1'
  })
  expect(reservationService.listBookings('1').get()).toEqual([
    expect.objectContaining({
      id: '1',
      dateStart: new Date('2024-01-03'),
      dateEnd: new Date('2024-01-04'),
      personName: 'HeyMan'
    })
  ])
})


test('should save booking when there is no conflict', () => {
  const reservationService = new MemoryReservationsService()
  const placesService = new MemoryPlacesService([
    new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
  ])
  const saveBooking = new CreateBooking(reservationService, placesService)
  saveBooking.execute({
    dateStart: new Date('2024-01-01'),
    dateEnd: new Date('2024-01-02'),
    personName: 'HeyMan',
    id: '1',
    placeId: '1'
  })
  saveBooking.execute({
    dateStart: new Date('2024-01-03'),
    dateEnd: new Date('2024-01-04'),
    personName: 'HeyMan',
    id: '2',
    placeId: '1'
  })

  expect(reservationService.listBookings('1').get()).toEqual([
    expect.objectContaining({
      id: '1',
      dateStart: new Date('2024-01-01'),
      dateEnd: new Date('2024-01-02'),
      personName: 'HeyMan', 
    }),
    expect.objectContaining({
      id: '2',
      dateStart: new Date('2024-01-03'),
      dateEnd: new Date('2024-01-04'),
      personName: 'HeyMan'
    })
  ])
})

test('should not save booking when there is conflict', () => {
  const reservationService = new MemoryReservationsService()
  const placesService = new MemoryPlacesService([
    new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
  ])
  const saveBooking = new CreateBooking(reservationService, placesService)
  saveBooking.execute({
    dateStart: new Date('2024-01-01'),
    dateEnd: new Date('2024-01-02'),
    personName: 'HeyMan',
    id: '1',
    placeId: '1'
  })
  expect(() => saveBooking.execute({
    dateStart: new Date('2024-01-02'),
    dateEnd: new Date('2024-01-03'),
    personName: 'HeyMan',
    id: '2',
    placeId: '1'
  })).toThrow(new DateOverlapError())
})

test('should remove booking', () => {
  const reservationService = new MemoryReservationsService()
  const placesService = new MemoryPlacesService([
    new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
  ])
  const saveBooking = new CreateBooking(reservationService, placesService)
  saveBooking.execute({
    dateStart: new Date('2024-01-01'),
    dateEnd: new Date('2024-01-02'),
    personName: 'HeyMan',
    id: '1',
    placeId: '1'
  })
  saveBooking.execute({
    dateStart: new Date('2024-01-03'),
    dateEnd: new Date('2024-01-04'),
    personName: 'HeyMan',
    id: '2',
    placeId: '1'
  })
  reservationService.removeBooking('1')
})

function helpCreateBookings (reservationService: ReservationsService, dates: { start: Date, end: Date }[]) {
  for (const date of dates) {
    reservationService.saveBooking({
      dateEnd: date.end,
      dateStart: date.start,
      personName: 'HeyMan',
      id: reservationService.getNextReservationCode(),
      place: new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
    })
  }
}


describe('CheckCalendarDisableBooking usecase', () => {
  test('should return if a date is disallowed', () => {
    const reservationService = new MemoryReservationsService()

    helpCreateBookings(reservationService, [
      { start: new Date('2024-05-01'), end: new Date('2024-05-02') },
      { start: new Date('2024-05-05'), end: new Date('2024-05-06') }
    ])

    const checkCalendarDisableBooking = new CheckCalendarDisableBooking(reservationService)
    
    // Calendar
    // 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09
    //  o      o       x       x       o       o       x       x       x

    helpCheckDisabled(checkCalendarDisableBooking, {
      '2024-05-01': true,
      '2024-05-02': true,
      '2024-05-03': false,
      '2024-05-04': false,
      '2024-05-05': true,
      '2024-05-06': true,
      '2024-05-07': false,
      '2024-05-08': false,
      '2024-05-09': false,
    })

    // Calendar
    // 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09
    //  x      x       ->      o       x       x       x       x       x 

    helpCheckDisabled(checkCalendarDisableBooking, {
      '2024-05-01': true,
      '2024-05-02': true,
      '2024-05-03': false,
      '2024-05-04': false,
      '2024-05-05': true,
      '2024-05-06': true,
      '2024-05-07': true,
      '2024-05-08': true,
      '2024-05-09': true,
    }, new Date('2024-05-03'))

    // Calendar 
    // 05/01 - 05/02 - 05/03 - 05/04 - 05/05 - 05/06 - 05/07 - 05/08 - 05/09 - 05/10
    //  x      x       x       x       x       x       o       o       o       ->

    helpCheckDisabled(checkCalendarDisableBooking, {
      '2024-05-01': true,
      '2024-05-02': true,
      '2024-05-03': true,
      '2024-05-04': true,
      '2024-05-05': true,
      '2024-05-06': true,
      '2024-05-07': false,
      '2024-05-08': false,
      '2024-05-09': false,
    }, new Date('2024-05-10'))
  })
})

describe('ListBookings reactive usecase', () => {
  test('should list bookings', () => {
    const reservationService = new MemoryReservationsService()
    helpCreateBookings(reservationService, [
      { start: new Date('2024-05-01'), end: new Date('2024-05-02') },
      { start: new Date('2024-05-05'), end: new Date('2024-05-06') }
    ])

    const listBookings = new ListBookings(reservationService)

    const bookingsReative = listBookings.execute('1')

    expect(bookingsReative.get()).toEqual([
      expect.objectContaining(
      {
        dateStart: new Date('2024-05-01'),
        dateEnd: new Date('2024-05-02'),
        personName: 'HeyMan',
      }),
      expect.objectContaining({
        dateStart: new Date('2024-05-05'),
        dateEnd: new Date('2024-05-06'),
        personName: 'HeyMan',
      })
    ])

    const fn = vi.fn()

    bookingsReative.subscribe(fn)

    reservationService.saveBooking({
      dateStart: new Date('2024-05-07'),
      dateEnd: new Date('2024-05-08'),
      personName: 'HeyMan',
      id: '3',
      place: new Place('1', 'Place 1', [], 'https://via.placeholder.com/150', 200)
    })

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith([
      expect.objectContaining({
        dateStart: new Date('2024-05-01'),
        dateEnd: new Date('2024-05-02'),
        personName: 'HeyMan',
      }),
      expect.objectContaining({
        dateStart: new Date('2024-05-05'),
        dateEnd: new Date('2024-05-06'),
        personName: 'HeyMan',
      }),
      expect.objectContaining({
        dateStart: new Date('2024-05-07'),
        dateEnd: new Date('2024-05-08'),
        personName: 'HeyMan',
      })
    ])


  })
})

function helpCheckDisabled (checkCalendarDisableBooking: CheckCalendarDisableBooking, expected: {
  [date: string]: boolean
}, startBookingDate?: Date) {

  const newObject: { [date: string]: boolean } = {}
  for (const date in expected) {
    newObject[date] = checkCalendarDisableBooking.execute({
      checkDate: new Date(date),
      startBookingDate,
    })
  }

  expect(newObject).toMatchObject(expected)
}


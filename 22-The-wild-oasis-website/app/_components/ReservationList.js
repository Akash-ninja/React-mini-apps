"use client"

import { useOptimistic } from "react"
import ReservationCard from "./ReservationCard"
import { deleteReservation } from "@/app/_lib/actions"

function ReservationList({ bookings }) {
  // [optimistic state, setter func.] = useOptimistic(actual state, optimistic state)
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      // next optimistic state (new state after deletion)
      return currentBookings.filter((booking) => booking.id !== bookingId)
    }
  )

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await deleteReservation(bookingId)
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  )
}

export default ReservationList

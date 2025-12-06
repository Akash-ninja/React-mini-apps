"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"
import { getBookings } from "./data-service"

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("bookingId"))

  // 1. Authenticate user
  const session = await auth()
  if (!session) throw new Error("Unauthorized to perform this action")

  // 2. Authorization
  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to edit this booking")
  }

  // 3. Build update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  }

  // 4. Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single()

  // 5. Error handling
  if (error) {
    throw new Error("Booking could not be updated")
  }

  // 6. Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath("/account/reservations")

  // 7. Redirection
  redirect("/account/reservations")
}

export async function deleteReservation(bookingId) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized to perform this action")

  const guestBookings = await getBookings(session.user.guestId)
  const guestBookingIds = guestBookings.map((booking) => booking.id)

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this booking")
  }

  const { error } = await supabase.from("bookings").delete().eq("id", bookingId)

  if (error) {
    throw new Error("Booking could not be deleted")
  }

  revalidatePath("/account/reservations")
}

export async function updateGuest(formData) {
  /* backend code */
  const session = await auth()

  if (!session) throw new Error("Unauthorized to perform this action")

  const nationalID = formData.get("nationalID")
  const [nationality, countryFlag] = formData.get("nationality").split("%")

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please provide a valid National ID number")
  }

  const updateData = {
    nationalID,
    nationality,
    countryFlag,
  }

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)

  if (error) {
    throw new Error("Guest could not be updated")
  }

  revalidatePath("/account/profile")
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}

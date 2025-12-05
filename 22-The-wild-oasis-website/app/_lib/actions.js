"use server"

import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"

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
    console.error(error)
    throw new Error("Guest could not be updated")
  }
  return data
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}

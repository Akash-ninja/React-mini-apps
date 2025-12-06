"use client"

import { useFormStatus } from "react-dom"
import { updateGuest } from "@/app/_lib/actions"

function UpdateProfileForm({ children, guest }) {
  const { fullName, email, nationalID, countryFlag } = guest

  return (
    <form
      className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
      action={updateGuest}
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          disabled
          name='fullName'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
          defaultValue={fullName}
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          disabled
          name='email'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
          defaultValue={email}
        />
      </div>

      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label htmlFor='nationality'>Where are you from?</label>
          <img
            src={countryFlag}
            alt='Country flag'
            className='h-5 rounded-sm'
          />
        </div>

        {children}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalID'>National ID number</label>
        <input
          name='nationalID'
          className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
          defaultValue={nationalID}
        />
      </div>

      <div className='flex justify-end items-center gap-6'>
        <Button />
      </div>
    </form>
  )
}

export function Button() {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'
    >
      {pending ? "Updating..." : "Update profile"}
    </button>
  )
}

export default UpdateProfileForm

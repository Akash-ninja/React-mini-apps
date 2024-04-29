import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { clearCart, getCart, getTotalcartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utils/helpers'
import store from '../../store'
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)
  const dispatch = useDispatch()

  const navigate = useNavigation()
  const isSubmitting = navigate.state === 'submitting'
  const {
    username,
    status: addressStatus,
    position,
    address,
    errors: errorAddress,
  } = useSelector((state) => state.user)
  const isLoadingAddress = addressStatus === 'loading'

  const formErrors = useActionData()

  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalcartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let`s go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            disabled={isLoadingAddress}
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-full bg-red-100 p-2 text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  const errors = {}
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you'
  }

  if (Object.keys(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  // Not to overuse
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder

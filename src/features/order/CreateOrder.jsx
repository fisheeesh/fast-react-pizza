/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from '../../store/store'
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch()
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  // console.log(cart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice

  const { username, status: addressStatus, address, position, error } = useSelector(store => store.user)
  const isLoadingAddress = addressStatus === 'loading'
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const formErrors = useActionData()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input defaultValue={username} className="input grow" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 p-2 rounded-md bg-red-100">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input w-full"
              type="text" name="address" required />
            {addressStatus === 'error' && <p className="text-xs mt-2 text-red-700 p-2 rounded-md bg-red-100">{error}</p>}
          </div>

          {!position.latitude && !position.longitude && <span className="absolute right-[3px] sm:top-[3px] top-[35px] md:right-1 md:top-[5px] z-10">
            <Button disabled={isLoadingAddress} onClick={(e) => {
              e.preventDefault()
              dispatch(fetchAddress())
            }} type={'small'}>Get Position</Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-0 focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? 'Placing order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name='position' value={`${position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ''}`} />
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  let errors = {}
  if (!isValidPhone(order.phone)) errors.phone = 'Please provide a valid phone number. We might need to contact you.!'

  if (Object.values(errors).length > 0) return errors

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;

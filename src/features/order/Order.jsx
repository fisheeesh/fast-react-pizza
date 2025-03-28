/* eslint-disable react-refresh/only-export-components */
// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import { getOrder } from '../../services/apiRestaurant'
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from '../order/OrderItem'
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";
import delivery from '../../assets/delivery.lottie'
import arrived from '../../assets/arrived.lottie'
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Order() {
  const order = useLoaderData()

  const fetcher = useFetcher()

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu')
  }, [fetcher])

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-6">
      <div className="flex items-center justify-center w-full">
        <DotLottieReact
          src={deliveryIn >= 0 ? delivery : arrived}
          loop
          autoplay
          style={{ width: '500px', height: '200px' }}
        />
      </div>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-red-50 tracking-wide">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
        {
          cart.map((item, index) => (
            <OrderItem key={index} item={item} isLoadingIngredients={fetcher.state === 'loading'} ingredients={fetcher?.data?.find(el => el.id === item.pizzaId)?.ingredients} />
          ))
        }
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="text-sm font-bold text-stone-600">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export const loader = async ({ params }) => {
  const order = await getOrder(params.orderId)
  return order
}

export default Order;

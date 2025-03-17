import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../ui/Home'
import Menu, { loader as menuLoader } from '@/features/menu/Menu'
import Cart from '../features/cart/Cart'
import Order, { loader as orderLoader } from '../features/order/Order'
import CreateOrder from '../features/order/CreateOrder'
import AppLayout from '../ui/AppLayout'
import Error from '../ui/Error'

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AppLayout />,
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    path: '/',
                    element: <Home />
                },
                {
                    path: '/menu',
                    element: <Menu />,
                    loader: menuLoader,
                    errorElement: <Error />,
                },
                {
                    path: '/cart',
                    element: <Cart />
                },
                {
                    path: '/order/new',
                    element: <CreateOrder />
                },
                {
                    path: '/order/:orderId',
                    element: <Order />,
                    loader: orderLoader,
                    errorElement: <Error />,
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

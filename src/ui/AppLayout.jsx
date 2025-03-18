import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from '../features/cart/CartOverview'
import Loader from "./Loader";

export default function AppLayout() {
    const navigation = useNavigation()
    const isLoading = navigation.state === 'loading'

    console.log(navigation)

    return (
        <div className="h-screen grid  grid-rows-[auto_1fr_auto]">
            {
                isLoading && <Loader />
            }
            <Header />
            <div className="overflow-scroll">
                <main className=" max-w-3xl mx-auto ">
                    <Outlet />
                </main>
            </div>
            <CartOverview />
        </div>
    )
}

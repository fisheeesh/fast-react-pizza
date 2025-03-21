import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../features/order/SearchBar";
import Username from "../features/user/Username";
import { useSelector } from "react-redux";
import { getTotalCartQuantity } from "../features/cart/cartSlice";

export default function Header() {
    const navigate = useNavigate()
    const totalCartQuantity = useSelector(getTotalCartQuantity)

    return (
        <header className="flex items-center justify-between bg-yellow-400 px-4 py-3 uppercase border-b border-stone-300 sm:px-6">
            <Link to={'/'} className="tracking-widest ">Fast React Pizza Co.</Link>
            <SearchBar />
            <div className="flex items-center gap-2">
                <Username />
                <div className="relative">
                    <svg onClick={() => navigate('/cart')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                    {totalCartQuantity > 0 && <span className="absolute left-2.5 top-0.5 w-3 h-3 flex items-center justify-center text-[9px] text-white bg-red-600 rounded-full">{totalCartQuantity}</span>}
                </div>
            </div>

        </header>
    )
}

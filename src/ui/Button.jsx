import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function Button({ children, disabled, to }) {
    const className = "bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 focus:outline-0 focus:ring focus:ring-yellow-300 focus:bg-yellow-300 disabled:cursor-not-allowed focus:ring-offset-2 cursor-pointer transition-colors duration-300 disabled:bg-slate-600 sm:px-6 sm:py-4"

    if (to) return <Link className={className} to={to}>{children}</Link>

    return (
        <button disabled={disabled} className={className}>
            {children}
        </button>
    )
}

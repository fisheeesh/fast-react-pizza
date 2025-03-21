import { Link } from "react-router-dom"

/* eslint-disable react/prop-types */
export default function Button({ children, disabled, to, type, onClick }) {
    const base = "bg-yellow-400 uppercase font-semibold text-stone-800 inline-block text-sm tracking-wide rounded-full hover:bg-yellow-300 focus:outline-0 focus:ring focus:ring-yellow-300 focus:bg-yellow-300 disabled:cursor-not-allowed focus:ring-offset-2 cursor-pointer transition-colors duration-300 disabled:bg-slate-200"
    const styles = {
        primary: base + ' px-4 py-3 md:px-6 md:py-4',
        small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
        round: base + ' px-2 py-1 text-xs',
        secondary: "uppercase text-sm border-2 border-stone-300 px-4 py-2.5 md:px-6 md:py-3.5 bg-transparent font-semibold text-stone-400 inline-block tracking-wide rounded-full hover:text-stone-800 hover:bg-stone-300 focus:outline-0 focus:ring focus:ring-stone-200 focus:bg-stone-300 focus:text-stone-800 disabled:cursor-not-allowed focus:ring-offset-2 cursor-pointer transition-colors duration-300 disabled:bg-slate-600"
    }

    if (to) return <Link className={styles[type]} to={to}>{children}</Link>

    if (onClick) return (
        <button onClick={onClick} disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )

    return (
        <button disabled={disabled} className={styles[type]}>
            {children}
        </button>
    )
}

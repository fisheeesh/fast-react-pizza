import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const onHandleSubmit = (e) => {
        e.preventDefault()

        if(!query) return

        navigate(`order/${query}`)
        setQuery('')
    }

    return (
        <form onSubmit={onHandleSubmit}>
            <input className="px-4 rounded-full py-2 text-sm bg-yellow-100 placeholder:text-stone-400 focus:outline-0 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:ring focus:ring-yellow-500 focus:ring-opacity-50" type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search oder #" />
        </form>
    )
}

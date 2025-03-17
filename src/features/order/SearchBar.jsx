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
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search oder #" />
        </form>
    )
}

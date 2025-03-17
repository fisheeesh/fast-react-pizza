import { Link } from "react-router-dom";
import SearchBar from "../features/order/SearchBar";

export default function Header() {
    return (
        <header>
            <Link to={'/'}>Fast React Pizza Co.</Link>
            <SearchBar />
            <p>SYP</p>
        </header>
    )
}

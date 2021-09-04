import "./Topbar.css"
import { Link } from "react-router-dom"

export default function Topbar() {
    return (
        <Link to="/">
            <header class="topbar">
                <h1>
                    CINEFLEX
                </h1>
            </header>
        </Link>
    )
}
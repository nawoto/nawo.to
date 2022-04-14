import * as React from "react"
import { Link } from "gatsby"

const Header = ({ title }) => {
    return (
        <header>
            <div className="py-6 hover-style">
                <h3 className="font-black text-4xl tracking-widest text-center">
                    <Link to="/">{title}</Link>
                </h3>
            </div>
            <nav>
                <ul className="text-lg grid grid-cols-2 md:grid-cols-4 divide-x text-center">
                    <li className="border-y hover-style">
                        <Link to="/">TOP</Link>
                    </li>
                    <li className="border-y hover-style">
                        <Link to="/">LOG</Link>
                    </li>
                    <li className="border-b md:border-y hover-style">
                        <Link to="/">TEXTS</Link>
                    </li>
                    <li className="border-b md:border-y hover-style">
                        <Link to="/about">ABOUT</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
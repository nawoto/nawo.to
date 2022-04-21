import * as React from "react"
import { Link } from "gatsby"

const Header = ({ title }) => {
  return (
    <header>
      <div className="hover-style py-6">
        <h3 className="text-center text-6xl font-black tracking-widest">
          <Link to="/">{title}</Link>
        </h3>
      </div>
      <nav>
        <ul className="grid grid-cols-2 divide-x text-center text-lg md:grid-cols-4">
          <li className="hover-style border-y">
            <Link to="/">TOP</Link>
          </li>
          <li className="hover-style border-y">
            <Link to="/logs">LOG</Link>
          </li>
          <li className="hover-style border-b md:border-y">
            <Link to="/texts">TEXTS</Link>
          </li>
          <li className="hover-style border-b md:border-y">
            <Link to="/about">ABOUT</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

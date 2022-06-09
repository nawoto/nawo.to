import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer className="border-t text-center text-sm">
      © {new Date().getFullYear()}, NISHIMURA Naoto All Rights Reserved.
      <span className="mx-5 text-xs underline">
        <Link to="/privacy">Privacy Policy</Link>
      </span>
    </footer>
  )
}

export default Footer

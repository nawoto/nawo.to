// global CSS styles with Tailwind CSS
import "./src/styles/global.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

// CSS style for Font Awesome
import "@fortawesome/fontawesome-svg-core/styles.css"

// Support like button (by Lyket)
import { Provider } from "@lyket/react"
const React = require("react")

export const wrapRootElement = ({ element }) => (
  <Provider apiKey="pt_e0e6f20240fbd1a9b06f7232301930">{element}</Provider>
)

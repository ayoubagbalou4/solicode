import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
        <div class="brand">Aqua<span>Smart</span></div>
        <div class="links">
            <Link to="/">Home</Link>
            <Link to="/conseils">Conseils</Link>
            <Link to="/#contact">Contact</Link>
            <Link to={'/login'}><button>Login</button></Link>
        </div>
    </header>
  )
}

export default Nav

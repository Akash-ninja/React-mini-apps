import Logo from './Logo'

// Structural component
function Navbar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  )
}

export default Navbar

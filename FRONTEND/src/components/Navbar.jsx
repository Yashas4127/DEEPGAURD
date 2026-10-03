import { Link, NavLink } from 'react-router-dom'
import { ScanSearch, ShieldCheck } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/analyze', label: 'Analyze' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="DeepGuard home">
          <span className="brand-mark">
            <ShieldCheck size={22} />
            <ScanSearch size={14} className="brand-scan" />
          </span>
          <span className="brand-text">DeepGuard</span>
        </Link>

        <div className="nav-links" aria-label="Site menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="header-actions">
          <div className="status-pill" aria-live="polite">
            <span className="status-dot" />
            System Status: ONLINE
          </div>
          <Link to="/analyze" className="primary-button small-button">
            Start Analysis
          </Link>
        </div>
      </nav>
    </header>
  )
}

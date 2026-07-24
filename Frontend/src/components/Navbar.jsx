import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <span className="brand">Portfolio</span>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
            Projects
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "active" : "")}>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

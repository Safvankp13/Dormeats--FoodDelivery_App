import React, { useState } from "react";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  LayoutDashboardIcon,
  Menu,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { useUserStore } from "../../store/useUserStore";
import { useMembershipStore } from "../../store/useMembershipStore";

const Header = () => {
  const { user, logout } = useUserStore();
  const { membership } = useMembershipStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="border">
      <header className="header">
        <div className="header-flex">
          <div className="left">Dormeats</div>

          <div className="menu-icon" onClick={toggleMobileMenu}>
            <Menu />
          </div>

          <div className={`right ${isMobileMenuOpen ? "show" : ""}`}>
            <nav>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>

              {user && (
                <NavLink
                  to="/cart"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Cart <ShoppingCart />
                </NavLink>
              )}

              {user?.role === "admin" && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Dashboard <LayoutDashboardIcon size={20} />
                </NavLink>
              )}

              <div className="more-menu-container">
                <NavLink to="#" onClick={toggleMenu}>
                  More
                </NavLink>

                {showMenu && (
                  <div className="menu-dropdown">
                    <ul>
                      <li>
                        <Link onClick={toggleMenu} className="menu-link" to="/menu">
                          Food Menu
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {user ? (
                <NavLink onClick={handleLogout} className="logout-btn">
                  Log Out <LogOut />
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `login ${isActive ? "active-link" : ""}`
                  }
                >
                  Log In <LogIn />
                </NavLink>
              )}

              <NavLink to="/premium" className="premium">
                {!membership ? "Join Us" : "Upgrade +"}
              </NavLink>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

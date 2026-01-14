import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import {
  authApi,
  useUseLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { data: me } = useUserInfoQuery(undefined);
  console.log(me);

  const getNavItems = () => {
    if (!me) {
      return [{ name: "Home", link: "/" }];
    }

    switch (me.role?.toLowerCase()) {
      case "user":
        return [
          { name: "Home", link: "/" },
          { name: "My Subscriptions", link: "/user/my-subscriptions" },
          { name: "Notifications Feed", link: "/user/notifications-feed" },
        ];
      case "admin":
        return [
          { name: "Home", link: "/" },
          { name: "Create Notification", link: "/admin/create-notification" },
          { name: "Notification List", link: "/admin/notification-list" },
        ];
      default:
        return [{ name: "Home", link: "/" }];
    }
  };

  const navItems = getNavItems();

  const isActive = (path: string) => location.pathname === path;

  const [logout] = useUseLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile: Hamburger Menu (Left) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

          {/* Desktop: Logo (Left) */}
          <Link
            to="/"
            className="hidden md:flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-black p-2 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-foreground">NotifyHub</span>
          </Link>

          {/* Desktop: Navigation Links (Center) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((link) => (
              <Link
                key={link.link}
                to={link.link}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.link)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive(link.link) && (
                  <span className="absolute inset-0 bg-muted rounded-lg border border-border"></span>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop: Auth Buttons (Right) */}
          <div className="hidden md:flex items-center gap-3">
            {me ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-accent/50 transition-all duration-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-accent/50 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative px-6 py-2 rounded-lg font-medium text-white bg-black hover:bg-gray-800 transition-all duration-300"
                >
                  <span className="relative z-10">Register</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Logo (Right) */}
          <Link to="/" className="md:hidden flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-black p-2 rounded-lg">
                <Bell className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">NotifyHub</span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-background/95 backdrop-blur-xl border-t border-border/40">
          {navItems.map((link) => (
            <Link
              key={link.link}
              to={link.link}
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.link)
                  ? "bg-muted text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 space-y-2 border-t border-border/40">
            {me ? (
              <>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-lg font-medium text-foreground hover:bg-accent/50 transition-all duration-300 text-left cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-foreground hover:bg-accent/50 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg font-medium text-center text-white bg-black hover:bg-gray-800 transition-all duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

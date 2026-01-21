import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContextProvider";
import {
  FiGrid,
  FiPlusSquare,
  FiSearch,
  FiBell,
  FiSettings,
  FiLogOut
} from "react-icons/fi";
import { BiStore } from "react-icons/bi";

export default function PageLayout({ children }) {
  const [authUser, setAuthUser] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Safe token parsing
  let name = "";
  let role = "";
  const token = sessionStorage.getItem("user");

  try {
    if (token) {
      const parsed = JSON.parse(atob(token));
      name = parsed.name || "User";
      role = parsed.role || "user";
    }
  } catch (e) {
    console.error("Invalid token");
  }

  useEffect(() => {
    if (token) setAuthUser(true);
    else window.location.href = "/";
  }, [token]);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "/";
  };

  const isActive = (path) => location.pathname.includes(path);

  if (!authUser) return null;

  return (
    <div className="flex h-screen bg-bg-main text-text-dark font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white hidden md:flex flex-col border-r border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
        <div className="h-20 flex items-center px-8 border-b border-gray-50 dark:border-gray-700">
          <div className="flex items-center gap-2 text-primary text-2xl font-bold font-display cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <span className="text-xl">S</span>
            </div>
            Slooze
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-semibold text-text-gray uppercase tracking-wider mb-4">Menu</p>

          {role === 'manager' && (
            <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('dashboard') ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-gray hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
              <FiGrid className="text-xl" />
              <span className="font-medium">Dashboard</span>
            </Link>
          )}

          <Link to="/product" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('product') && !isActive('add') ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-gray hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <BiStore className="text-xl" />
            <span className="font-medium">Products</span>
          </Link>

          <Link to="/product/add" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive('product/add') ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-text-gray hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            <FiPlusSquare className="text-xl" />
            <span className="font-medium">Add Product</span>
          </Link>

          <div className="pt-8">
            <p className="px-4 text-xs font-semibold text-text-gray uppercase tracking-wider mb-4">Settings</p>
            <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-text-gray hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <FiSettings className="text-xl" />
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
            <a href="/" onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-error hover:bg-error/10 transition-all mt-2">
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </a>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-50 dark:border-gray-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
              {name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate dark:text-white">{name}</p>
              <p className="text-xs text-text-gray truncate capitalize">{role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg-main dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-2xl font-bold font-display dark:text-white capitalize">{location.pathname.split('/')[1] || 'Dashboard'}</h1>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full w-64">
              <FiSearch className="text-text-gray text-lg" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm ml-3 w-full text-text-dark dark:text-white placeholder-gray-400" />
            </div>

            <button className="relative p-2 text-text-gray hover:text-primary transition-colors">
              <FiBell className="text-xl" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
          <div className="mt-10 text-center text-text-gray text-sm py-4">
            2025 Slooze , @Sumit Kumawat
          </div>
        </div>
      </main>
    </div>
  );
}

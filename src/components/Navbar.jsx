import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ExcelAnalytics</h1>

        <button className="sm:hidden" onClick={() => setOpen(!open)}>
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <ul
          className={`sm:flex gap-6 items-center font-medium ${
            open ? "block" : "hidden sm:flex"
          }`}
        >
          <li>
            <Link to="/#features" className="hover:text-indigo-500">
              Features
            </Link>
          </li>

          <li>
            <Link to="/#contact" className="hover:text-indigo-500">
              Contact
            </Link>
          </li>

          {/* New Auth Buttons */}
          <li>
            <Link
              to="/login"
              className="text-sm px-4 py-2 rounded bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="text-sm px-4 py-2 rounded border border-indigo-500 text-indigo-600 hover:bg-indigo-100"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

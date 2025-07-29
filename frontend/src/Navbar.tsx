import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 text-blue-600 font-semibold text-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
        </svg>
        <span>Monash Health</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/about" className="hover:text-blue-600 transition">About</Link>
        <Link to="/services" className="hover:text-blue-600 transition">Services</Link>
        <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
        <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
      </div>

      {/* TODO: Mobile menu toggle (optional) */}
    </nav>
  );
}

export default Navbar;

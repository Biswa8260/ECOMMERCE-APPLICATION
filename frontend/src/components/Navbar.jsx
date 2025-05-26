import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import logo from '../assets/image.png';

const Navbar = () => {
  const { token, logout, getCartCount } = useContext(ShopContext);
  const cartCount = getCartCount();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-xl font-bold">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-16 w-auto bg-white p-1 rounded" />
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/collection" className="hover:underline">Collection</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        {/* {token && <Link to="/profile" className="hover:underline">Profile</Link>} */}
        <Link to="/cart" className="relative hover:underline">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        {token ? (
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

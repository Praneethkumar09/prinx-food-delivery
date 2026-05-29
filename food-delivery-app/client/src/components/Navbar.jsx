import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {

  const { cart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center px-6 md:px-10 py-4 bg-black/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">

      {/* LOGO */}
      <h1 className="text-3xl md:text-4xl font-extrabold flex items-center gap-1">
        <span className="text-blue-400 drop-shadow-[0_0_15px_#3b82f6]">
          PRIN
        </span>
        <span className="text-white">X</span>
        <span className="text-blue-400 animate-pulse">💙</span>
      </h1>

      {/* SEARCH BAR */}
      <input
        type="text"
        placeholder="Search for food, restaurants..."
        className="hidden md:block bg-gray-900 px-5 py-2 rounded-full w-1/3 text-white outline-none border border-gray-700 focus:border-blue-500"
      />

      {/* MENU */}
      <div className="flex items-center gap-5 md:gap-7 text-gray-300 font-medium">

        <Link className="hover:text-orange-400 transition" to="/">
          Home
        </Link>

        <Link className="hover:text-orange-400 transition" to="/orders">
          Orders
        </Link>

        {/* CART */}
        <Link to="/cart" className="relative text-xl hover:text-orange-400 transition">

          <FaShoppingCart />

          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {cart.length}
            </span>
          )}

        </Link>

        {/* USER */}
        {user ? (
          <div className="flex items-center gap-3">

            <p className="text-blue-400 font-semibold hidden md:block">
              Hi, {user.name}
            </p>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 px-4 py-2 rounded-full hover:bg-orange-600 transition"
          >
            Sign In
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;
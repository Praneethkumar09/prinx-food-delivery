import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-blue-400">
            PRINX MENU 💙
          </h2>
        </div>

        {/* MENU ITEMS */}
        <div className="flex flex-col p-6 gap-5 text-gray-300">

          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-orange-400">
            🏠 Home
          </Link>

          <Link to="/explore" onClick={() => setIsOpen(false)} className="hover:text-orange-400">
            🔍 Explore
          </Link>

          <Link to="/orders" onClick={() => setIsOpen(false)} className="hover:text-orange-400">
            📦 Orders
          </Link>

          <Link to="/favorites" onClick={() => setIsOpen(false)} className="hover:text-orange-400">
            ❤️ Favorites
          </Link>

          <Link to="/payments" onClick={() => setIsOpen(false)} className="hover:text-orange-400">
            💳 Payments
          </Link>

        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 p-6 text-gray-500 text-sm">
          PRINX Food App © 2026
        </div>
      </div>
    </>
  );
}

export default Sidebar;
import { useState } from "react";
import Navbar from "../components/Navbar";
import foods from "../data/foods";
import FoodCard from "../components/FoodCard";
import Sidebar from "../components/Sidebar";
import CartPanel from "../components/CartPanel";
import OfferBanner from "../components/OfferBanner";

function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("NONE");

  // 🔍 FILTER + SEARCH + SORT
  const filteredFoods = [...foods]
    .filter((food) => {

      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchFilter =
        filter === "ALL" ||
        (filter === "VEG" && food.type === "veg") ||
        (filter === "NONVEG" && food.type === "nonveg");

      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sort === "LOW") return a.price - b.price;
      if (sort === "HIGH") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-black min-h-screen text-white">

      {/* NAVBAR */}
      <Navbar
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        toggleCart={() => setCartOpen(!cartOpen)}
      />

      {/* SIDEBAR + CART PANEL */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <CartPanel isOpen={cartOpen} setIsOpen={setCartOpen} />

      {/* OFFER BANNER */}
      <OfferBanner />

      {/* HERO */}
      <div className="px-10 py-16 flex flex-col md:flex-row items-center justify-between">

        <div className="max-w-xl">

          <h1 className="text-6xl font-extrabold leading-tight">
            Delicious Food <br />
            Delivered In <span className="text-orange-500">Minutes 🚀</span>
          </h1>

          <p className="text-gray-400 mt-6 text-lg">
            Order your favorite meals from top restaurants near you.
          </p>

          {/* SEARCH */}
          <div className="mt-8 flex bg-gray-900 rounded-full overflow-hidden border border-gray-700">

            <input
              type="text"
              placeholder="Search burgers, pizza..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent px-6 py-4 w-full outline-none"
            />

            <button className="bg-orange-500 px-8 hover:bg-orange-600">
              Search
            </button>

          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          className="w-[500px] rounded-3xl shadow-2xl mt-10 md:mt-0"
        />
      </div>

      {/* FILTER */}
      <div className="px-10 flex gap-4 mb-5">

        <button onClick={() => setFilter("ALL")} className="px-4 py-2 bg-gray-800 rounded">
          All
        </button>

        <button onClick={() => setFilter("VEG")} className="px-4 py-2 bg-green-600 rounded">
          Veg 🥦
        </button>

        <button onClick={() => setFilter("NONVEG")} className="px-4 py-2 bg-red-600 rounded">
          Non-Veg 🍗
        </button>

      </div>

      {/* SORT */}
      <div className="px-10 flex gap-4 mb-8">

        <button onClick={() => setSort("NONE")} className="px-4 py-2 bg-gray-700 rounded">
          Default
        </button>

        <button onClick={() => setSort("LOW")} className="px-4 py-2 bg-blue-600 rounded">
          Price Low ↑
        </button>

        <button onClick={() => setSort("HIGH")} className="px-4 py-2 bg-purple-600 rounded">
          Price High ↓
        </button>

      </div>

      {/* FOOD GRID */}
      <div className="px-10 pb-20">

        <h2 className="text-3xl font-bold mb-8">
          Popular Dishes 🔥
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">

          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))
          ) : (
            <p className="text-gray-400">No food found 😢</p>
          )}

        </div>

      </div>

    </div>
  );
}

export default Home;
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function FoodCard({ food }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition border border-gray-800">

      <img
        src={food.image}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {food.name}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Fresh & tasty food
        </p>

        <div className="flex justify-between items-center mt-4">

          <p className="text-orange-400 font-bold text-lg">
            ₹{food.price}
          </p>

          <button
            onClick={() => addToCart(food)}
            className="bg-orange-500 px-4 py-2 rounded-full text-sm hover:bg-orange-600"
          >
            Add
          </button>

        </div>

      </div>
    </div>
  );
}

export default FoodCard;
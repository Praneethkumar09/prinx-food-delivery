import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartPanel({ isOpen, setIsOpen }) {

  const { cart, totalPrice } = useContext(CartContext);

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-gray-900 text-white p-6 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-3">
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <hr className="my-4" />

      <h3 className="text-xl font-bold">
        Total: ₹{totalPrice}
      </h3>

      <button className="w-full mt-4 bg-orange-500 py-3 rounded font-bold">
        Checkout 🚀
      </button>

    </div>
  );
}

export default CartPanel;
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ➕ ADD TO CART
  const addToCart = (food) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === food.id);

      if (found) {
        return prev.map((i) =>
          i.id === food.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...food, qty: 1 }];
    });
  };

  // ➖ DECREASE QTY
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // ❌ REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  // 💰 TOTAL PRICE
  const totalPrice = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        decreaseQty,
        removeFromCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
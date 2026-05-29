import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Cart() {

  const {
    cart,
    setCart,
    addToCart,
    decreaseQty,
    removeFromCart
  } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));

  // 💰 TOTAL PRICE
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // 💳 PAYMENT + ORDER FUNCTION
  const placeOrder = async () => {
    try {

      if (!user) {
        alert("Please login first");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      // 1️⃣ Create Razorpay order from backend
      const { data: order } = await axios.post(
        "http://localhost:5000/create-order",
        {
          amount: totalAmount,
        }
      );

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SvEU4RMFXvFePb", // 🔴 CHANGE THIS
        amount: order.amount,
        currency: order.currency,
        name: "PRINX Food Delivery",
        description: "Food Order Payment",
        order_id: order.id,

        handler: async function (response) {
          try {

            // 3️⃣ Save order in DB after payment success
            await axios.post("http://localhost:5000/place-order", {
              userId: user.id || user._id,
              items: cart,
              totalAmount,
              paymentId: response.razorpay_payment_id,
            });

            alert("🎉 Payment Successful & Order Placed");

            // clear cart
            setCart([]);

          } catch (err) {
            console.log(err);
            alert("Order saving failed ❌");
          }
        },

        theme: {
          color: "#F97316",
        },
      };

      // 4️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-10 min-h-screen bg-black text-white">

        <h1 className="text-4xl font-bold mb-8">
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="bg-slate-800 p-6 rounded-xl">
            <p>No items in cart</p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* ITEMS */}
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 p-5 rounded-xl flex justify-between items-center"
              >

                {/* LEFT */}
                <div className="flex items-center gap-5">

                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover rounded-lg"
                    alt={item.name}
                  />

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-orange-400 font-semibold mt-2">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>

                </div>

                {/* RIGHT CONTROLS */}
                <div className="flex gap-3 items-center">

                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

            {/* TOTAL */}
            <div className="bg-slate-900 p-6 rounded-xl flex justify-between items-center">

              <h2 className="text-3xl font-bold">
                Total
              </h2>

              <p className="text-3xl text-green-400 font-bold">
                ₹{totalAmount}
              </p>

            </div>

            {/* PAY BUTTON */}
            <button
              onClick={placeOrder}
              className="w-full bg-orange-500 py-4 rounded-xl text-xl font-bold hover:bg-orange-600 transition"
            >
              Pay & Place Order 💳
            </button>

          </div>
        )}

      </div>
    </>
  );
}

export default Cart;
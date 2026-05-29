import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Orders() {

  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/orders/${user.id || user._id}`
      );

      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10 text-white bg-black min-h-screen">

        <h1 className="text-4xl font-bold mb-6">
          My Orders 📦
        </h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 p-5 rounded-xl mb-4"
            >
              <p className="text-green-400 font-bold">
                ₹{order.totalAmount}
              </p>

              <p className="text-gray-400">
                Items: {order.items.length}
              </p>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default Orders;
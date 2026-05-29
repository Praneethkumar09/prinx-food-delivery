require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const path = require("path");

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   SAFE MODEL IMPORTS
======================= */
const User = require(path.resolve(__dirname, "models", "User"));
const Order = require(path.resolve(__dirname, "models", "Order"));

/* =======================
   MONGODB CONNECTION
======================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.log("MongoDB Error:", err));

/* =======================
   RAZORPAY INIT (SAFE)
======================= */
let razorpay = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.log("⚠️ Razorpay keys missing in .env");
}

/* =======================
   FOOD DATA
======================= */
const foods = [
  { id: 1, name: "Burger", price: 199, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { id: 2, name: "Pizza", price: 299, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591" },
  { id: 3, name: "Biryani", price: 249, image: "https://images.unsplash.com/photo-1701579231349-d7459c40919d" },
  { id: 4, name: "Pasta", price: 189, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9" },
  { id: 5, name: "French Fries", price: 149, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877" },
  { id: 6, name: "Sandwich", price: 129, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af" },
  { id: 7, name: "Chicken Wings", price: 349, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2" },
  { id: 8, name: "Ice Cream", price: 99, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb" },
  { id: 9, name: "Noodles", price: 179, image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d" },
  { id: 10, name: "Momos", price: 159, image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb" },
  { id: 11, name: "Fried Rice", price: 199, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b" },
  { id: 12, name: "Paneer Tikka", price: 279, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8" },
  { id: 13, name: "Dosa", price: 129, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976" },
  { id: 14, name: "Idli", price: 89, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc" },
  { id: 15, name: "Chocolate Cake", price: 199, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
  { id: 16, name: "Cold Coffee", price: 149, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c" },
  { id: 17, name: "Chicken Biryani", price: 349, image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a" },
  { id: 18, name: "Veg Manchurian", price: 219, image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb" },
  { id: 19, name: "Tacos", price: 249, image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85" },
  { id: 20, name: "Donut", price: 119, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b" },
  { id: 21, name: "Falooda", price: 179, image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60" },
  { id: 22, name: "Shawarma", price: 229, image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783" },
  { id: 23, name: "Samosa", price: 59, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950" },
  { id: 24, name: "Mango Juice", price: 99, image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4" },
];

/* =======================
   ROUTES
======================= */

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.get("/foods", (req, res) => {
  res.json(foods);
});

/* =======================
   REGISTER
======================= */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User exists" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hash });
    await user.save();

    res.json({ message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   LOGIN
======================= */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   CREATE ORDER (RAZORPAY)
======================= */
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!razorpay) {
      return res.status(500).json({ message: "Razorpay not configured" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment failed" });
  }
});

/* =======================
   PLACE ORDER
======================= */
app.post("/place-order", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    const order = new Order({
      userId,
      items,
      totalAmount,
    });

    await order.save();

    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   GET ORDERS
======================= */
app.get("/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =======================
   START SERVER
======================= */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
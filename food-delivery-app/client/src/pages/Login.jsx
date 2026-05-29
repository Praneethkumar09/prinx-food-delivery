import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {

        // 🔐 LOGIN
        const res = await axios.post(
          "http://localhost:5000/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        // 💾 SAVE DATA
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        localStorage.setItem(
          "token",
          res.data.token
        );

        alert("Login Successful 🚀");

        // 🚀 SMOOTH REDIRECT (NO RELOAD)
        navigate("/");

      } else {

        // 📝 REGISTER
        await axios.post(
          "http://localhost:5000/register",
          formData
        );

        alert("Registration Successful ✅");

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setIsLogin(true);
      }

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-gray-900 p-10 rounded-2xl w-[400px] shadow-2xl">

        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          {isLogin ? "Login" : "Register"}
        </h1>

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 p-3 rounded bg-gray-800 text-white outline-none"
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded bg-gray-800 text-white outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded bg-gray-800 text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-500 py-3 rounded font-bold hover:bg-orange-600"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-400 mt-6 text-center cursor-pointer hover:text-white"
        >
          {isLogin
            ? "Create new account"
            : "Already have account?"}
        </p>

      </div>
    </div>
  );
}

export default Login;
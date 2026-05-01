import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          form
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/movies");
      } else {
        await axios.post(
          "http://localhost:5000/api/auth/signup",
          form
        );

        alert("Signup successful! Please login.");
        setIsLogin(true);
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://wallpapercave.com/wp/wp10615935.jpg')" // 🎬 cinematic background
      }}
    >
      
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      
      <div className="relative bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-white/20">

        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? "Welcome Back 🎬" : "Join Movie World 🚀"}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full mb-3 p-2 rounded bg-white/80 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full mb-4 p-2 rounded bg-white/80 outline-none"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          className="text-center text-white mt-4 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "New here? Create account"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}
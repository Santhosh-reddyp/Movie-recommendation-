import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminAddMovie from "./pages/AdminAddMovie";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings"; 

import Navbar from "./components/Navbar";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={
          dark
            ? "dark bg-gray-900 text-white min-h-screen"
            : "bg-gray-100 text-black min-h-screen"
        }
      >
        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/admin/add-movie" element={<AdminAddMovie />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
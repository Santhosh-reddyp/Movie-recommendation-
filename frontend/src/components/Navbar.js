import { useNavigate } from "react-router-dom";

export default function Navbar({ dark, setDark }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/movies")}
      >
        Movie Booking 
      </h1>
      <div className="flex items-center gap-4">

        <span className="font-medium">
          👤 {user?.email || "Guest"}
        </span>

      
        <button
          onClick={() => navigate("/my-bookings")}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          My Bookings
        </button>

        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          {dark ? " Light" : " Dark"}
        </button>
<button
  onClick={() => {
    localStorage.clear();
    navigate("/");
  }}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Logout
</button>
<button
  onClick={() => navigate("/admin/add-movie")}
  className="bg-green-500 text-white px-3 py-1 rounded"
>
  Admin
</button>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bookings/my", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("Error loading bookings");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Bookings 🎟
      </h1>

      {/* 🔄 Loading */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((b) => (
            <div
              key={b._id}
              className="border p-4 rounded-lg shadow bg-white dark:bg-gray-800"
            >
              <h2 className="font-bold text-lg mb-2">
                🎬 {b.showId?.movieId?.title || "Movie"}
              </h2>

              <p>
                <b>🎭 Theatre:</b>{" "}
                {b.showId?.theatreId?.name || "N/A"}
              </p>

              <p>
                <b>📅 Date:</b>{" "}
                {b.showId?.date || "N/A"}
              </p>

              <p>
                <b>⏰ Time:</b>{" "}
                {b.showId?.showTime || "N/A"}
              </p>

              <p>
                <b>🎟 Seats:</b>{" "}
                {b.seats?.length
                  ? b.seats.join(", ")
                  : "N/A"}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Booking ID: {b._id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
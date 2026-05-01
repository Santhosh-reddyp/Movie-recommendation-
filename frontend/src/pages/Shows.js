import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Shows() {
  const [shows, setShows] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const location = useLocation();
  const navigate = useNavigate();

  const movieId = new URLSearchParams(location.search).get("movieId");

 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shows", {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then((res) => {
        const filtered = res.data.filter(
          (s) =>
            s.movieId === movieId ||
            s.movieId?._id === movieId
        );

        setShows(filtered);
      })
      .catch(() => alert("Error loading shows"));
  }, [movieId]);

 
  const formattedDate = selectedDate
    .toISOString()
    .split("T")[0];


  const filteredShows = shows.filter(
    (s) => s.date === formattedDate
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">

      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">
        Available Shows 
      </h1>

     
      <div className="mb-5 flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()} // prevents past dates
          className="p-2 border rounded text-center dark:bg-gray-800 dark:text-white"
        />
      </div>

    
      {filteredShows.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No shows available for selected date
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {filteredShows.map((s) => (
            <div
              key={s._id}
              className="border p-4 rounded-lg shadow-md bg-white dark:bg-gray-800"
            >
              <h2 className="font-bold text-gray-900 dark:text-white">
                {s.theatreId?.name || "Theatre"}
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                Screen: {s.screen}
              </p>

              <p className="text-gray-700 dark:text-gray-300">
                Time: {s.showTime}
              </p>

             
              <button
                onClick={() => navigate(`/booking?showId=${s._id}`)}
                className="bg-red-500 text-white w-full mt-3 py-2 rounded hover:bg-red-600"
              >
                Book Seats
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
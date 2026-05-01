import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies", {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((res) => setMovies(res.data))
      .catch(() => alert("Error loading movies"));
  }, []);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Now Showing 🎬</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((m) => (
          <div
            key={m._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition duration-300"
          >
            {/* Image */}
            <div className="h-64 w-full overflow-hidden">
              <img
                src={m.image}
                alt={m.title}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x400?text=No+Image")
                }
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3">
              <h2 className="font-semibold text-lg truncate">
                {m.title}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-300">
                {m.genre} • {m.language}
              </p>

              <button
                onClick={() => navigate(`/shows?movieId=${m._id}`)}
                className="mt-3 bg-red-500 text-white w-full py-2 rounded hover:bg-red-600"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [blockedSeats, setBlockedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]); // ✅ FROM DB
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const showId = new URLSearchParams(location.search).get("showId");

  const rows = ["A", "B", "C", "D", "E", "F"];
  const cols = 8;

  const goldRows = ["A", "B"];

  // ✅ FETCH BOOKED SEATS FROM BACKEND
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/bookings/seats/${showId}`)
      .then((res) => {
        setBookedSeats(res.data);
      })
      .catch(() => console.log("Error fetching seats"));
  }, [showId]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // 🔴 permanent block
    if (blockedSeats.includes(seat)) return;

    setBlockedSeats((prev) => [...prev, seat]);

    setTimeout(() => {
      setBlockedSeats((prev) => prev.filter((s) => s !== seat));
    }, 10000);

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const getSeatPrice = (seat) => {
    const row = seat[0];
    return goldRows.includes(row) ? 250 : 150;
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + getSeatPrice(seat),
    0
  );

  const bookSeats = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        [
          {
            showId,
            seats: selectedSeats
          }
        ],
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      setSelectedSeats([]);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data || "Booking Failed");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Select Seats 🎟</h1>

      <div className="text-center mb-4 bg-gray-400 text-white py-2">
        SCREEN
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-4 mb-3">
        <span className="bg-yellow-300 px-2 py-1 rounded">Gold</span>
        <span className="bg-gray-300 px-2 py-1 rounded">Silver</span>
        <span className="bg-green-500 text-white px-2 py-1 rounded">Selected</span>
        <span className="bg-red-500 text-white px-2 py-1 rounded">Booked</span>
        <span className="bg-yellow-500 text-white px-2 py-1 rounded">Blocked</span>
      </div>

      {rows.map((row) => (
        <div key={row} className="flex justify-center gap-2 mb-2">
          <span>{row}</span>

          {Array.from({ length: cols }, (_, i) => {
            const seat = row + (i + 1);

            return (
              <div
                key={seat}
                onClick={() => toggleSeat(seat)}
                className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer
                  ${
                    bookedSeats.includes(seat)
                      ? "bg-red-500 text-white"
                      : blockedSeats.includes(seat)
                      ? "bg-yellow-500 text-white"
                      : selectedSeats.includes(seat)
                      ? "bg-green-500 text-white"
                      : goldRows.includes(row)
                      ? "bg-yellow-300 text-black"
                      : "bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
                  }`}
              >
                {seat}
              </div>
            );
          })}
        </div>
      ))}

      <p className="text-center mt-4">
        Selected Seats: {selectedSeats.join(", ")}
      </p>

      <p className="text-center mt-2 font-bold">
        Total Price: ₹{totalPrice}
      </p>

      <div className="text-center mt-4">
        <button
          onClick={() => {
            if (selectedSeats.length === 0) {
              alert("Select seats first");
              return;
            }
            setShowPayment(true);
          }}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Proceed to Pay 💳
        </button>
      </div>

      {/* PAYMENT */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80">

            <h2 className="text-lg font-bold mb-3 text-center">
              Fake Payment 💳
            </h2>

            <p className="text-center mb-3">
              Seats: {selectedSeats.join(", ")}
            </p>

            <p className="text-center mb-3">
              Total: ₹{totalPrice}
            </p>

            <button
              onClick={async () => {
                setLoading(true);

                setTimeout(async () => {
                  await bookSeats();
                  setLoading(false);
                  setShowPayment(false);

                  alert("Payment Successful 🎉 Booking Confirmed!");

                  localStorage.removeItem("token"); // logout
                  navigate("/"); // redirect to login
                }, 1500);
              }}
              className="bg-green-600 text-white w-full mt-4 py-2 rounded"
            >
              {loading ? "Processing..." : "Confirm Payment"}
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="w-full mt-2 py-2 bg-red-400 text-white rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
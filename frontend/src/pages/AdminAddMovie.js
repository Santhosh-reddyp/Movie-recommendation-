import { useState } from "react";
import axios from "axios";

export default function AdminAddMovie() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    language: "",
    genre: "",
    image: ""
  });

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/movies",
        form,
        {
          headers: {
            Authorization: localStorage.getItem("token")
          }
        }
      );

      alert("Movie Added Successfully 🎉");

      setForm({
        title: "",
        description: "",
        duration: "",
        language: "",
        genre: "",
        image: ""
      });
    } catch (err) {
      console.log(err);
      alert("Error adding movie");
    }
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">
        Add Movie 🎬
      </h1>

      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Duration"
        value={form.duration}
        onChange={(e) =>
          setForm({ ...form, duration: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Language"
        value={form.language}
        onChange={(e) =>
          setForm({ ...form, language: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Genre"
        value={form.genre}
        onChange={(e) =>
          setForm({ ...form, genre: e.target.value })
        }
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Image URL"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
        className="border p-2 mb-4 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white w-full py-2 rounded"
      >
        Add Movie
      </button>
    </div>
  );
}
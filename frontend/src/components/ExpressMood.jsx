import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMoodStore from "../store/MoodStore";
import usePlaylistStore from "../store/SuggestStore";
import axios from "axios";
import { useNavigate } from "react-router";
export default function ExpressMood() {
  const [customMood, setCustomMood] = useState("");
  const { resetMoods } = useMoodStore();
  const navigate=useNavigate();
  const {addPlaylists}=usePlaylistStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customMood.trim()) {
      toast.error("Please express your emotions");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/moods", {
        moods: customMood.trim(), 
      });

      toast.success("Mood submitted successfully!");
      console.log(data);
      setCustomMood(""); 
      addPlaylists(data);
      navigate('/suggest',{state:customMood.trim()});
      resetMoods(); 
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="How are you feeling?"
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 w-80 rounded-xl hover:bg-green-600 transition"
        >
          Submit 
        </button>
      </form>
    </div>
  );
}

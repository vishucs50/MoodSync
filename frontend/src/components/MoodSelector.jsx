import { toast } from "react-toastify";
import useMoodStore from "../store/MoodStore";
import usePlaylistStore from "../store/SuggestStore";
import axios from "axios";
import { useNavigate } from "react-router";
const moods = [
  "Happy",
  "Sad",
  "Energetic",
  "Relaxed",
  "Calm",
  "Romantic",
  "Motivated",
  "Peaceful",
  "Excited",
];

export default function MoodSelector() {
  const { moods: selectedMoods, toggleMood,resetMoods} = useMoodStore();
  const {addPlaylists}=usePlaylistStore();
  const max = 3;
  const navigate=useNavigate();
  const handleClick = (mood) => {
    if (selectedMoods.length >= max && !selectedMoods.includes(mood)) {
      toast.error(`Only ${max} selections allowed`);
    } else {
      toggleMood(mood, max);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedMoods.length === 0) {
      toast.error("Select at least one mood");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/moods", {
        moods: selectedMoods.join(" "),
      });

      toast.success("Moods submitted successfully!");

      console.log(data);
      addPlaylists(data);
      navigate('/suggest',{state:selectedMoods.join(" ")});
      resetMoods();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex justify-center items-center m-10">
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 p-4">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => handleClick(mood)}
            className={`px-6 py-2 rounded-3xl font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1
              ${
                selectedMoods.includes(mood)
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {mood}
          </button>
        ))}

        <button
          type="submit"
          className="col-span-3 bg-blue-500 text-white py-2 rounded-xl mt-4 hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

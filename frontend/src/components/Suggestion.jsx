import usePlaylistStore from "../store/SuggestStore";
import { useLocation } from "react-router"; 
export default function Suggestion() {
  const { playlists } = usePlaylistStore();
  const location=useLocation();
  const currentMood=location.state;
  const filteredPlaylists = playlists.filter(
    (playlist) => playlist.moods === currentMood
  );

  if (!filteredPlaylists.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-800 text-white">
        No playlists available for your current status.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 p-8 flex flex-col items-center ">
      <h1 className="text-3xl font-bold text-white mb-8">
        Suggested Playlists 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {filteredPlaylists.map((playlist, index) => (
          <a
            key={index}
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center bg-gray-700 hover:bg-gray-600 transition rounded-xl shadow-md overflow-hidden hover:scale-105"
          >
            <img
              src={playlist.image}
              alt={playlist.name}
              className="w-full h-full object-cover rounded-t-xl"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-white">
                {playlist.name}
              </h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

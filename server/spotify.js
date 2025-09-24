require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const runGemini=require('./gemini.js');
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

async function runSpotify(Input) {
  await authenticate();
  const mood=await runGemini(Input);
  const playlists = await getMoodPlaylists(mood);
  return playlists;
}

async function authenticate() {
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body["access_token"]);
}

async function getMoodPlaylists(mood) {
  try {
    const res = await spotifyApi.searchPlaylists(mood, { limit: 10 });

    if (!res.body.playlists || !res.body.playlists.items) {
      console.log(" No playlists found for mood:", mood);
      return [];
    }

    return res.body.playlists.items
      .filter((p) => p) 
      .map((p) => ({
        name: p.name || "Untitled Playlist",
        url: p.external_urls?.spotify || "",
        image: p.images?.[0]?.url || "",
      }));
  } catch (err) {
    console.error("Error fetching playlists:", err.message);
    return [];
  }
}

module.exports=runSpotify;
const express = require("express");
const cors = require("cors");
const runSpotify=require('./spotify.js');
const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.post("/api/moods", async (req, res) => {
  const { moods } = req.body; 
  const playlists = await runSpotify(moods); 
  const data= playlists.map((p) => ({
    ...p,
    moods, 
  }));
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

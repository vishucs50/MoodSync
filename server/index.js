const express = require("express");
const cors = require("cors");
const runSpotify=require('./spotify.js');
const app = express();
const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/MoodSync";
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Database connected"));
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

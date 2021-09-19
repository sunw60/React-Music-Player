const express = require('express');
const cors = require('cors')
const lyricsFinder = require("lyrics-finder")


const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/lyrics', async (req,res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "Lyrics Unavailable"
    res.json({ lyrics })
    
})

app.listen(3001)
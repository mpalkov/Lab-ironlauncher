const express = require('express');
const router = express.Router();
const Character = require("../models/Character.model");
const Episode = require("../models/Episode.model");

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    //console.log("TRY");
  const charactersList = await Character.find();
  const episodesList = await Episode.find();
    //console.log("rendering, :", charactersList, episodesList);
  res.render("form", {charactersList, episodesList});
  }
  catch (error) {
    console.error(error);
  }
});

router.post("/character/add-to-episode", async (req, res, next) => {
  try {
    const characterId = req.body.characterId;
    const episodeId = req.body.episodeId;
    const character = await Character.findOneAndUpdate({_id: characterId}, {$push: {episodes: episodeId}});
    const episode = await Episode.findOneAndUpdate({_id: episodeId}, {$push: {characters: characterId}});
    res.render("success", {characterName: character.name, episodeTitle: episode.title});
  }
  catch(error) {
    console.error(error);
  }
});

module.exports = router;

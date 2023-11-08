const mongoose = require('mongoose');
const Character = require("../models/Character.model");
const { log } = require("console");
require('dotenv').config({path: "../.env"});

mongoose.connect(process.env.MONGODB_URI)
    .then(()=> {
        console.log("connected to DB")
        return Character.deleteMany();
    })
    .then(() => fetch("https://rickandmortyapi.com/api/character"))
    .then(data => data.json())
    // jsonData.results[]
    .then(jsonData => {
       // console.log(jsonData)
        const cleanedData = jsonData.results.map((element) => {
            return ({name: element.name, imageUrl: element.image, episodes: []});
        });
        console.log(cleanedData);
        return cleanedData;
    })
    .then(cleanedData => Character.insertMany(cleanedData))
    .then(() => {
        console.log("Created all the documents in the DB\nDisconnecting...");
        return mongoose.disconnect();
    })
    .catch(error => console.log(error));
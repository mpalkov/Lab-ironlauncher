const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    imageURL: String,
    episodes: [{type: mongoose.Schema.Types.ObjectId, ref: "Episode"}]
});

const Character = mongoose.model("Character", characterSchema);

module.exports = Character;
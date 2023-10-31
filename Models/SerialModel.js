const mongoose = require('mongoose');

const epsaverSchema = new mongoose.Schema({
        title: { type: String, required: true },
        translate: { type: String, required: true },
        series: { type: Number, required: true },
        episode: { type: Number, required: true },
        status: { type: String, required: true },
        poster: { type: String, required: true },
        comment: { type: String, required: true },
        raiting: { type: String, required: true },
        newSeason: { type: String},
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model(`epsaver`, epsaverSchema);
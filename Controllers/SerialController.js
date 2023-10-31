const SerialModel = require('../Models/SerialModel');

module.exports.getAllSerials = async (req, res) => {
    const { userId } = req.query;
    const allSerials = await SerialModel.find({ userId });
    res.send(allSerials)
}

module.exports.saveSerial = async (req, res) => {
    const {  title, translate, series, episode, 
        status, poster, comment, raiting, newSeason, userId } = req.body;
    SerialModel.create({ title, translate, series, episode, 
        status, poster, comment, raiting, newSeason, userId })
    .then((data) => {console.log('serial added')
    res.send(data)
    })
}

module.exports.deleteSerial = async (req, res) => {
    const { _id } = req.body;
    SerialModel.findByIdAndDelete(_id)
    .then(() => res.send("deleted a serial"))
}

module.exports.editSerial = async (req, res) => {
    const { _id, translate, series, episode, 
        status, comment, raiting } = req.body;
    SerialModel.findByIdAndUpdate(_id, {  translate, series, episode, 
        status, comment, raiting })
    .then(() => (res.send("edit")))
}




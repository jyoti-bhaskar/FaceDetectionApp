const clarifai = require('clarifai');

// initialize with your api key.
const app = new Clarifai.App({
    apiKey: '6fc38b6af0d74ea8ac0fb341082427b6'
  });

const handleAPIcall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input
    )
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'));
}

const handleImage = (req, res,db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entires'));
}

module.exports = {
    handleImage,
    handleAPIcall
}
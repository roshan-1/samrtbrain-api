const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '748cb00db89044be8ca65f2d31bdc1c3'
   });

const handleImageAPI = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('API connection error'))
}

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users')
    .returning('score')
    .where('id','=',id)
    .increment('score',1)
    .then(score => res.json(score));
}

module.exports = {
    handleImage,
    handleImageAPI
}
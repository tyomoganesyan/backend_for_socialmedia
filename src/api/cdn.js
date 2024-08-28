const express = require('express')
const cdnRouter = express.Router()
const photoModel = require('../models/photos')

cdnRouter.get('/:photo_id', async (req, res) => {
    try {
        const photo = await photoModel.findById(req.params.photo_id);

        if (!photo) {
            return res.status(404).send('Photo not found');
        }

        res.set('Content-Type', photo.contentType);
        res.send(photo.data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = cdnRouter;
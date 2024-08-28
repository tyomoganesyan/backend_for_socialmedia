const express = require('express');
const FeedService = require('../services/feed')
const feedRouter = express.Router();


feedRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const feed = await FeedService.getFeedById(id);
    return res.status(200).json({ feed });
})


module.exports = feedRouter;
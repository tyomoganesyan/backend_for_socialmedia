const express = require('express');
const FeedService = require('../services/feed')
const feedRouter = express.Router();


feedRouter.get('/:id', async (req, res) => {
    const result = await FeedService.getFeedById(req.params.id);
    return res.status(200).json({ result });
})


module.exports = feedRouter;
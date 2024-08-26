const express = require('express')
const loginRouter = express.Router()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/users');
const SECRET = process.env.SECRET;


loginRouter.post('/', (req, res) => {
    if (!req.body.password) {
        return res.status(400).json({ messsage: "password required" });
    };

    if (!req.body.username) {
        return res.status(400).json({ message: "login required" });
    };
    const { password, username } = req.body
    crypto.pbkdf2(password, SECRET, 6, 12, 'sha512', async (err, hash) => {
        if (err) {
            throw new Error("Something went wrong...");
        }
        const result = await usersModel.findOne({ username: username, password: hash.toString('hex') })
        if (!result) {
            return res.status(401).json({ message: "username or password incorrect" })
        }
        const payload = {
            username: result.username
        }
        const token = jwt.sign(payload, SECRET, { expiresIn: 60 * 60 })
        res.status(200).json({ message: "verifed successfully", token })
    })
});

module.exports = loginRouter;
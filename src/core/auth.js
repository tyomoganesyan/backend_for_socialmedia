const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const authMiddleWare = (req, res, next) => {

    if (!req.headers['authorization']) {
        return res.status(400).json({ message: "authorization required" })
    }

    const token = req.headers['authorization'].split(" ")[1]
    try {
        const isVerifed = jwt.verify(token, SECRET)
        if (isVerifed.exp - isVerifed.iat < 0) {
            return res.status(401).json({ message: "Token expired" })
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid Token" })
    }
}


module.exports = authMiddleWare;
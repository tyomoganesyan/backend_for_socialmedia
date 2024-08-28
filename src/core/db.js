const URI_MONGO = process.env.URI_MONGO
const mongoose = require('mongoose')


mongoose.connect(URI_MONGO).then(() => {
    console.log('connection to MongoDB:success')
}).catch(() => {
    console.log("connection to MongoDb:fail")
})

module.exports = mongoose
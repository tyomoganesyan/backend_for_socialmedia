const URI = process.env.URI
const mongoose = require('mongoose')


mongoose.connect(URI).then(() => {
    console.log('connection to MongoDB:success')
}).catch(() => {
    console.log("connection to MongoDb:fail")
})

module.exports = mongoose
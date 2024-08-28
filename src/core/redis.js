const URI_REDIS = process.env.URI_REDIS
const redis = require('redis');
const client = redis.createClient({
    URI_REDIS
});


client.connect()
    .then(() => {
        console.log('connect success');
    })
    .catch(err => {
        console.error('error redis', err);
    });

    module.exports = client;

const mongoose = require('mongoose')


async function connectToMongoDB(url){
    return mongoose.connect(url ?? "mongodb://localhost:27017/shortUrl");
}

module.exports = {
    connectToMongoDB,
}
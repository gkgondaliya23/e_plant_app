const mongoose = require('mongoose');

// db connection
exports.dbconnect = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log(`DB is Connected...`))
        .catch((err) => console.log(err));
    
};
const mongoose = require('mongoose');
require('dotenv').config()

const connectionToDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the database successfully!!");
    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    connectionToDb
}

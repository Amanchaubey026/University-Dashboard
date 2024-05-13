const express = require('express');
const { connectionToDb } = require('./src/config/db.config');
const app = express();
require('dotenv').config()
const cors = require('cors');
const { userRouter, Router, router } = require('./src/routes/all.routes');
const PORT = process.env.PORT || 3000 ;
app.use(express.json());
app.use(cors());


app.get('/',(req,res)=>{
    res.send("<h1>Server up! 👍</h1>")
})

app.use('/user',router);

app.listen(PORT,async()=>{
    try {
        await connectionToDb();
        console.log(`The server is running on port http://localhost:${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
})
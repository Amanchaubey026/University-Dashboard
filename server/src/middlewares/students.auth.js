const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = (req,res,next)=>{
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token);
    if(!token){
        return res.status(403).send({ message: 'Unauthorized' })
    }

    jwt.verify(token,process.env.JWT_SECRET,(decoded,err)=>{
        if(err){
            return res.status(401).send({ message: 'Invalid token' })
        }

        req.userId = decoded.id;
        next()
    })
    
}

module.exports = {
    auth
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = localStorage.getItem('accessToken'); 
    // console.log(token);
    if (!token) {
        return res.status(403).send({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, null, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }

        // Save the token and user role to local storage
        localStorage.setItem('userRole', decoded.role);

        req.userId = decoded.id;
        req.user = decoded;
        next();
    });
};

module.exports = {
    auth
};

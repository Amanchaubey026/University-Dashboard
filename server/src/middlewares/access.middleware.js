const access = (...roles) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        console.log(userRole);
        if (roles.includes(userRole)) {
            next();
        } else {
            res.status(403).send('Forbidden');
        }
    };
};

module.exports = {access};

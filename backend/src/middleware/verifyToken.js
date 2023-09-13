const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw new Error('Token not found');
    try {
        const [, tokenValue] = token.split(' ');
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = decodedToken.data;
    } catch (err) {
        console.log('err:',err);
        throw new Error('Expired or invalid token');
    }
     next();
};

module.exports = verifyToken;
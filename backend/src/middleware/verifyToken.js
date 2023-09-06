const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) throw new Error('Token not found');
    try {
        console.log('token:',token);
        const [, tokenValue] = token.split(' ');
        console.log('tokenValue:',tokenValue);
        const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET);
        console.log('decodedToken:',decodedToken);
        req.user = decodedToken.data;
        console.log('req.user:',req.user);
    } catch (err) {
        console.log('err:',err);
        throw new Error('Expired or invalid token');
    }
     next();
};

module.exports = verifyToken;
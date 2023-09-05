const jwt = require('jsonwebtoken');

module.exports = (payload) => jwt.sign({ data: payload }, process.env.JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '1d',
});

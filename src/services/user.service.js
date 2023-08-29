const { User } = require('../models');
const { loginValidator } = require('./validations');
const getNewToken = require('../auth');

const login = async (user) => {
    const { password, email } = user;
    loginValidator(user);    
    const authenticatedUser = await User.findOne({ where: { email, password } });
    
    if (!authenticatedUser) throw Error('Invalid fields');
    return getNewToken(authenticatedUser);
};

module.exports = {
    login,
};

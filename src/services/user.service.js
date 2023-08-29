const { User } = require('../models');
const { loginValidator, createUserValidator } = require('./validations');
const getNewToken = require('../auth');

const login = async (user) => {
    const { password, email } = user;
    loginValidator(user);    
    const authenticatedUser = await User.findOne({ where: { email, password } });
    
    if (!authenticatedUser) throw Error('Invalid fields');
    return getNewToken(authenticatedUser);
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

const createUser = async (user) => {
    const { password, email, name } = user;
    createUserValidator(user);
    const userExists = await getUserByEmail(email);
    if (userExists) throw Error('User already registered');
    const createdUser = await User.create({ password, email, name });
    return getNewToken(createdUser);
    //  return ({ name: 'mamao', email: 'mamao@dks.com' });
};
     module.exports = {
    login,
    createUser,
};

const { User, Category } = require('../models');
const { loginValidator, createUserValidator } = require('./validations');
const getNewToken = require('../auth');

const login = async (user) => {
    loginValidator(user);    
    const authenticatedUser = await User.findOne({ where: { 
        email: user.email, password: user.password }, 
    });
    
    if (!authenticatedUser) throw Error('Invalid fields');
    const { password, ...userWithOutPassword } = authenticatedUser.dataValues;
    return getNewToken(userWithOutPassword);
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });
    return user;
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw Error('User does not exist');
    const { password, ...userWithOutPassword } = user.dataValues;
    return userWithOutPassword;
};

const getAllUsers = async () => {
    const users = await User.findAll();
    const usersWithOutPassword = users.map((user) => {
        const { password, ...userWithOutPassword } = user.dataValues;
        return userWithOutPassword;
    });

    return usersWithOutPassword;
};

const createUser = async (user) => {
    createUserValidator(user);
    const userExists = await getUserByEmail(user.email);
    if (userExists) throw Error('User already registered');
    const createdUser = await User.create({ 
        password: user.password, email: user.email, displayName: user.displayName, image: user.image
     });
    await Category.create({ name: 'Geral', userId: createdUser.id });
     const { password, ...userWithOutPassword } = createdUser.dataValues;
    return getNewToken(userWithOutPassword);
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw Error('User does not exist');
    await User.destroy({ where: { id } });
};
     
module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};

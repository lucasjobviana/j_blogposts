const loginService = require('../services/user.service');
const userService = require('../services/user.service');

const login = async (req, res, _next) => {
    console.log('diabo de merda')
    console.log(req.body)
     
    const token = await loginService.login(req.body);
    if (token) { 
        return res.status(200).json({
        token,
        }); 
    }
};

const getAllUsers = async (req, res, _next) => {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
}; 

const getUserById = async (req, res, _next) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
};

const createUser = async (req, res, _next) => {
    const token = await userService.createUser(req.body); 
    if (token) {
        return res.status(201).json({
            token,
        });
    }
};

const deleteUser = async (req, res, _next) => {
    const { id } = req.user;
    await userService.deleteUser(id);
    return res.status(204).end();
};

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};
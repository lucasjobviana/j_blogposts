const loginService = require('../services/user.service');
const userService = require('../services/user.service');

const login = async (req, res, _next) => {
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

const createUser = async (req, res, _next) => {
    const token = await userService.createUser(req.body); 
    if (token) {
        return res.status(201).json({
            token,
        });
    }
};

module.exports = {
    login,
    createUser,
    getAllUsers,
};
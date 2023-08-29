const loginService = require('../services/user.service');

const login = async (req, res, _next) => {
    const token = await loginService.login(req.body);
    if (token) { 
        return res.status(200).json({
        token,
    }); 
}
};

module.exports = {
    login,
};
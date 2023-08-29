const userLoginSchema = require('./login.schema');
const loginValidator = require('./login.validator');
const createUserSchema = require('./createUser.schema');
const createUserValidator = require('./createUser.validator');

module.exports = {
    userLoginSchema,
    loginValidator,
    createUserSchema,
    createUserValidator,
};
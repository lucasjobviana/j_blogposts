const { userLoginSchema } = require('./login.schema');

const loginValidator = (user) => {
    const { error } = userLoginSchema.validate(user);
    if (error) throw new Error('Some required fields are missing');
};

module.exports = loginValidator;
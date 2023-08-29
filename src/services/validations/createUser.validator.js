const { createUserSchema } = require('./createUser.schema');

const createUserValidator = (user) => {
    const { error } = createUserSchema.validate(user);
    if (error) throw new Error(error.message);// throw new Error('Some required fields are missing');
};

module.exports = createUserValidator;
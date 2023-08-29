const { createCategorySchema } = require('./createCategory.schema');

const createCategoryValidator = (category) => {
    const { error } = createCategorySchema.validate(category);
    if (error) throw new Error(error.message);// throw new Error('Some required fields are missing');
};

module.exports = createCategoryValidator;
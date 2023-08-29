const userLoginSchema = require('./login.schema');
const loginValidator = require('./login.validator');
const createUserSchema = require('./createUser.schema');
const createUserValidator = require('./createUser.validator');
const createCategorySchema = require('./createCategory.schema');
const createCategoryValidator = require('./createCategory.validator');
const createBlogPostSchema = require('./createBlogPost.schema');
const createBlogPostValidator = require('./createBlogPost.validator');

module.exports = {
    userLoginSchema,
    loginValidator,
    createUserSchema,
    createUserValidator,
    createCategorySchema,
    createCategoryValidator,
    createBlogPostSchema,
    createBlogPostValidator,
};
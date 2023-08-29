const error400 = (errorMessage) => {
    switch (errorMessage) {
        case '"displayName" length must be at least 8 characters long':
        case '"password" length must be at least 6 characters long':
        case '"email" must be a valid email':
        case '"name" is required':
        return 400;
        default: 
    }
};

const error400User = (errorMessage) => {
    switch (errorMessage) {
        case 'Some required fields are missing':
        case 'Invalid fields':
        case 'one or more "categoryIds" not found':
        return 400;
        default:
    }
};

const error409 = (errorMessage) => {
    switch (errorMessage) {
        case 'User already registered': 
        return 409;
        default: 
    }
};

const error401 = (errorMessage) => {
    switch (errorMessage) {
        case 'Token not found':
        case 'Expired or invalid token': 
        case 'Unauthorized user':
        return 401;
        default: 
    }
};

const error404 = (errorMessage) => {
    switch (errorMessage) {
        case 'User does not exist':
        case 'Post does not exist':
        return 404;
        default:
    }
};

const mapMsgErrorToStatus = (errorMessage = '') => 
   error400(errorMessage) 
|| error400User(errorMessage) 
|| error409(errorMessage) 
|| error401(errorMessage) 
|| error404(errorMessage);
module.exports = { mapMsgErrorToStatus };
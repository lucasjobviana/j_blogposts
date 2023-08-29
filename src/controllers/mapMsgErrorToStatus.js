const error400 = (errorMessage) => {
    console.log(errorMessage);
    switch (errorMessage) {
        case 'Some required fields are missing':
        case 'Invalid fields':
        return 400;
        default: 
    }
};

const error422 = (errorMessage) => {
    switch (errorMessage) {
        case '_"name" length must be at least 5 characters long': 
        return 422;
        default: 
    }
};

const error404 = (errorMessage) => {
    switch (errorMessage) {
        case '_Product not found': 
        return 404;
        default: 
    }
};

const mapMsgErrorToStatus = (errorMessage = '') => error400(errorMessage) 
|| error422(errorMessage) 
|| error404(errorMessage) || 666;

module.exports = { mapMsgErrorToStatus };
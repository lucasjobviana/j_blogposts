import { AxiosError } from 'axios';

export const errorInterceptor = (error: AxiosError) => {
  const code = error.response?.status;
  console.log('errorInterceptor: error.response.status =', code);
  const message = error.message;
  console.log('errorInterceptor: error.response.data.message =', message);
  const erroCode = error.code;
  console.log('errorInterceptor: error.code =', erroCode);

  if (error.message === 'Network Error') {
    console.log('Error: Network Error');
  }
  if (error.code === '400') {
    switch (message) {
    case '"displayName" length must be at least 8 characters long': return Promise.reject(new Error('O nome deve ter pelo menos 8 caracteres'));
    case '"password" length must be at least 6 characters long': return Promise.reject(new Error('A senha deve ter pelo menos 6 caracteres'));
    case '"email" must be a valid email': return Promise.reject(new Error('O email deve ser válido'));
    case '"name" is required': return Promise.reject(new Error('O nome é obrigatório'));
    case 'Some required fields are missing': return Promise.reject(new Error('Algum campo obrigatório está faltando'));
    case 'Invalid fields': return Promise.reject(new Error('Campos inválidos'));
    case 'one or more "categoryIds" not found': return Promise.reject(new Error('Uma ou mais categorias não foram encontradas'));
    default:
    }
  }
  else if (error.code === '409') {
    switch (message) {
    case 'User already registered': return Promise.reject(new Error('Este usuário já está cadastrado'));
    default:
    }
  }
  else if (error.code === '401') {
    switch (message) {
    case 'User does not exist': return Promise.reject(new Error('Este usuário não existe'));
    case 'Post does not exist': return Promise.reject(new Error('Este post não existe'));
    default:
    }
  }
  else if (error.code === '404') {
    switch (message) {
    case 'User does not exist': return Promise.reject(new Error('Este usuário não existe'));
    case 'Post does not exist': return Promise.reject(new Error('Este post não existe'));
    default:
    }
  }

  return Promise.reject(error);
};

/*
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
|| error404(errorMessage)
|| 666;

module.exports = { mapMsgErrorToStatus };
*/
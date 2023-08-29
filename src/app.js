const express = require('express');
require('express-async-errors');
const { userRouter, loginRouter, categoryRouter } = require('./routers');
const { mapMsgErrorToStatus } = require('./controllers/mapMsgErrorToStatus');
const { verifyToken } = require('./middleware');
const { userController } = require('./controllers');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/login', loginRouter);
app.post('/user', userController.createUser);
app.use(verifyToken);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);

app.use((err, _req, res, _next) => {
  if (err) {
    const msgError = err.message;
    return res.status(mapMsgErrorToStatus(msgError)).json({ message: msgError });
  }
});

module.exports = app;

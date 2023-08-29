const express = require('express');
require('express-async-errors');
const { userRouter, loginRouter } = require('./routers');
const { mapMsgErrorToStatus } = require('./controllers/mapMsgErrorToStatus');

const app = express();

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/user', userRouter);
app.use('/login', loginRouter);

app.use((err, _req, res, _next) => {
  if (err) {
    const msgError = err.message;
    return res.status(mapMsgErrorToStatus(msgError)).json({ message: msgError });
  }
});

module.exports = app;

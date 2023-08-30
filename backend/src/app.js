const express = require('express');
require('express-async-errors');
const { userRouter, loginRouter, categoryRouter, blogPostRouter } = require('./routers');
const { mapMsgErrorToStatus } = require('./controllers/mapMsgErrorToStatus');
const { verifyToken } = require('./middleware');
const { userController } = require('./controllers');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());
app.get('/', (_request, response) => {
  response.json({ message: "Hello World by BlogApi's Get Method!" });
});

app.use('/login', loginRouter);
app.post('/user', userController.createUser);
app.use(verifyToken);
app.use('/user', userRouter);
app.use('/categories', categoryRouter);
app.use('/post', blogPostRouter);

app.use((err, _req, res, _next) => {
  if (err) {
    const msgError = err.message;
    return res.status(mapMsgErrorToStatus(msgError)).json({ message: msgError });
  }
});

module.exports = app;

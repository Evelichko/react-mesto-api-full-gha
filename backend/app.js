require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const bodyParser = require('body-parser');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');
const routeSignUp = require('./routes/signUp');
const routeSignIn = require('./routes/signIn');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const NotFoundError = require('./errors/NotFoundError');

const { MONGODB_URL } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use('/', routeSignUp);
app.use('/', routeSignIn);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new NotFoundError('Страницы с таким адресом нет')));

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
